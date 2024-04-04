import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import uuid4 from 'uuid4';
import { updateMessage } from '../service/message.service.js';
import { getRoomById } from '../service/room.service.js';
import { getUserById } from '../service/user.service.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const getUser = async id => {
  return await getUserById(id);
};

const getRoom = async id => {
  return await getRoomById(id);
};

io.on('connection', async socket => {
  console.log('🚀 user connected! : ', socket.id);

  const userId = socket.handshake.query.userId;
  const user = await getUser(userId);
  const joinedRooms = user.rooms;

  socket.on('refresh', () => {
    if (joinedRooms.length > 0) {
      console.log(
        `💡 connet! : [${user.name}]님이 기존 참여했던 방에 입장하셨습니다`
      );
    }
  });

  socket.on('join', async roomId => {
    const isJoined = joinedRooms.includes(roomId);

    if (!isJoined) {
      const room = await getRoom(roomId);
      socket.join(roomId);

      // send admin Message
      const adminMessage = setAdminMessage(
        room,
        `${user.name}님이 입장하셨습니다!`
      );

      io.to(roomId).emit('message', adminMessage);
      // set json - admin message
      await updateMessage(adminMessage);

      console.log(
        `💡 new Join! : [${user.name}]님이 [${room.title}]방에 입장하셨습니다`
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('🚀 user disconnected! : ', socket.id);
  });
});

const setAdminMessage = (room, message) => {
  const adminMessage = {
    id: uuid4(),
    room: room.id,
    from: 'admin',
    to: room.users,
    created_at: Date.now(),
    content: message,
  };

  return adminMessage;
};

export { app, io, server };

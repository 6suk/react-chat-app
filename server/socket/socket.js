import express from 'express';

import { createServer } from 'http';

import dotenv from 'dotenv';
import { Server } from 'socket.io';

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

const getUser = async id => getUserById(id);

const onlineUsers = new Set();

const updateOnlineUsers = ({ userId, isAdd }) => {
  const prevCount = onlineUsers.size;

  if (isAdd) {
    onlineUsers.add(userId);
  } else {
    onlineUsers.delete(userId);
  }

  if (prevCount !== onlineUsers.size) {
    io.emit('onlineUser', Array.from(onlineUsers));
  }
};

io.on('connection', async socket => {
  console.log('🚀 user connected! : ', socket.id);
  const { userId } = socket.handshake.query;
  updateOnlineUsers({ userId, isAdd: true });

  socket.on('refresh', async () => {
    const user = await getUser(userId);
    const joinedRooms = user?.rooms || [];

    if (joinedRooms.length > 0) {
      socket.join(joinedRooms);
      console.log(
        `💡 connect! : [${user.name}]님이 기존 참여했던 방에 입장하셨습니다`
      );
    }
  });

  socket.on('join', roomId => {
    // const user = await getUser(userId);
    // const room = await getRoom(roomId);

    // const joinedRooms = user.rooms || [];
    // const isJoined = joinedRooms.includes(roomId);

    // if (!isJoined) {
    //   // send Admin Message
    //   setAdminMessage({
    //     io,
    //     room,
    //     content: `${user.name}님이 입장하셨습니다!`,
    //     userId: user.id,
    //   });

    //   console.log(
    //     `💡 new Join! : [${user.name}]님이 [${room.title}]방에 입장하셨습니다`
    //   );

    //   // (임시) room 입장 시 rooms 반환 => 참여 유저가 실시간으로 연동 되어야함
    //   io.sockets.emit('new join', { room_id: room.id, user_name: user.name });
    // }
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('🚀 user disconnected! : ', socket.id);
    updateOnlineUsers({ userId, isAdd: false });
  });
});

export { app, io, server };

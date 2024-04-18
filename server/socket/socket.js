/* eslint-disable no-console */
import express from 'express';

import { createServer } from 'http';

import { Server } from 'socket.io';

import { getUserById } from '../service/user.service.js';

import env from '../env.config.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.origin,
    methods: ['GET', 'POST'],
  },
});

const getUser = async id => getUserById(id);
const onlineUsers = new Set();

io.on('connection', async socket => {
  try {
    console.log('🚀 user connected! : ', socket.id);
    const { userId } = socket.handshake.query;

    const user = await getUser(userId);
    const joinedRooms = user?.rooms || [];

    if (user) {
      onlineUsers.add(userId);
      io.emit('onlineUser', Array.from(onlineUsers));
    }

    if (joinedRooms.length > 0) {
      socket.join(joinedRooms);
      console.log(
        `💡 refresh : [${user.name}]님이 기존 참여했던 방에 입장하셨습니다`
      );
    }

    socket.on('disconnect', async () => {
      console.log('🚀 user disconnected! : ', socket.id);

      onlineUsers.delete(userId);
      io.emit('onlineUser', Array.from(onlineUsers));
    });
  } catch (error) {
    throw new Error('Server Error!');
  }
});

const socketJoin = async ({ userId, roomId }) => {
  const sockets = await io.fetchSockets();

  sockets.forEach(socket => {
    const { userId: socketUserId } = socket.handshake.query;
    if (socketUserId === userId) {
      socket.join(roomId);
    }
  });
};

export { app, io, server, socketJoin };

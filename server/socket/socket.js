/* eslint-disable no-console */
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

io.on('connection', async socket => {
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

  socket.on('disconnect', () => {
    console.log('🚀 user disconnected! : ', socket.id);
    onlineUsers.delete(userId);
    io.emit('onlineUser', Array.from(onlineUsers));
  });
});

const socketJoin = ({ userId, roomId }) => {
  const { sockets } = io.sockets;

  sockets.forEach(socket => {
    const { userId: socketUserId } = socket.handshake.query;
    if (socketUserId === userId) {
      socket.join(roomId);
    }
  });
};

export { app, io, server, socketJoin };

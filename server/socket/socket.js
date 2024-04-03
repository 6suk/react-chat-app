import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN],
  },
});

console.log(process.env.ORIGIN);

io.on('connection', socket => {
  console.log('🚀 User Connected! : ', socket.id);

  socket.on('join', roomId => {
    socket.join(roomId);
    console.log(`🚀 ${socket.id}님이 ${roomId} 방에 입장하셨습니다!`);
  });

  socket.on('disconnect', () => {
    console.log('🚀 user disconnected! : ', socket.id);
  });
});

export { app, server, io };

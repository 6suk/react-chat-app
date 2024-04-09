import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import { app, server } from './socket/socket.js';

import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import roomRoute from './routes/room.route.js';
import roomsRoute from './routes/rooms.route.js';
import userRoute from './routes/user.route.js';

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/room', roomRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/messages', messageRoute);

server.listen(PORT, () => {
  console.log(`🎉 server Runnig : http://localhost:${PORT}`);
});

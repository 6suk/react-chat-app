import express from 'express';

import path from 'path';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { app, server } from './socket/socket.js';

import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import roomRoute from './routes/room.route.js';
import roomsRoute from './routes/rooms.route.js';
import userRoute from './routes/user.route.js';

import env from './env.config.js';

const PORT = env.port;

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.origin,
    credentials: true,
  })
);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/room', roomRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/messages', messageRoute);

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const clientDir = path.join(__dirname, '../client/dist');

app.use(express.static(clientDir));
app.use(express.static(path.join(clientDir, 'assets')));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`🎉 server Runnig : http://localhost:${PORT}`);
});

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoute from './routes/auth.route.js';
import roomRoute from './routes/room.route.js';
import roomsRoute from './routes/rooms.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();

const app = express();
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

app.get('/', (req, res) => {
  res.send('Hello!!');
});

app.listen(PORT, () => {
  console.log(`🎉 Server Runnig : http://localhost:${PORT}`);
});

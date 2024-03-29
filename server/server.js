import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('Hello!!');
});

app.listen(PORT, () => {
  console.log(`🎉 Server Runnig : http://localhost:${PORT}`);
});

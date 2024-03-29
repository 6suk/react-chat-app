import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.get('/', (req, res) => {
  res.send('Hello!!');
});

app.listen(PORT, () => {
  console.log(`🎉 Server Runnig : http://localhost:${PORT}`);
});

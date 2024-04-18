import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const env = {
  origin: `http://localhost:${process.env.VITE_CLIENT_PORT || 5173}`,
  nodeENV: process.env.NODE_ENV || 'development',
  port: process.env.VITE_SERVER_PORT || 3000,
  jwtKey: process.env.JWT_SECRET || '@@jwtSecret@@',
};

export default env;

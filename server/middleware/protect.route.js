import jwt from 'jsonwebtoken';

import { getUserById } from '../service/user.service.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ error: '토근이 만료 되었습니다.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ error: '존재하지 않는 토큰입니다.' });
      return;
    }

    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(403).json({ error: '존재하지 않는 유저입니다.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('🚨 Protect Route Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export default protectRoute;

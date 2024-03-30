import jwt from 'jsonwebtoken';
import { getUserById } from '../service/user.service.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res.status(401).json({ error: '토근이 만료 되었습니다.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ error: '존재하지 않는 토큰입니다.' });

    const user = await getUserById(decoded.id);

    if (!user)
      return res.status(401).json({ error: '존재하지 않는 유저입니다.' });

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

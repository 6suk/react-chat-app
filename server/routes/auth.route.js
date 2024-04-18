import express from 'express';

import { login, logout, refreshToken } from '../controllers/auth.controller.js';
import { removeRooms } from '../controllers/room.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.post('/login', login);
router.post('/token', refreshToken);
router.post('/logout', protectRoute, logout, removeRooms);

export default router;

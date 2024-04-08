import express from 'express';

import { login, logout, refreshToken } from '../controllers/auth.controller.js';
import { removedRoom } from '../controllers/room.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', protectRoute, logout, removedRoom);
router.post('/token', refreshToken);

export default router;

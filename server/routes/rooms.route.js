import express from 'express';

import { getRoomsByUser, getRooms } from '../controllers/rooms.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.get('/', protectRoute, getRooms);
router.get('/user', protectRoute, getRoomsByUser);

export default router;

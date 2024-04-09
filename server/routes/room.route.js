import express from 'express';

import { createRoom, removeRooms } from '../controllers/room.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

// Room
router.post('/', protectRoute, createRoom);
router.delete('/', protectRoute, removeRooms);

export default router;

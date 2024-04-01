import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import {
  createdRoom,
  joinRoom,
  removedRoom,
} from '../controllers/room.controller.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// Room
router.post('/', protectRoute, createdRoom);
router.get('/:id', protectRoute, joinRoom);
router.delete('/:id', protectRoute, removedRoom);

// Message
router.post('/:id', protectRoute, sendMessage);
router.get('/:id/msg', protectRoute, getMessages);

export default router;

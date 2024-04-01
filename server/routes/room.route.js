import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import {
  createdRoom,
  joinRoom,
  removedRoom,
} from '../controllers/room.controller.js';

const router = express.Router();

router.post('/', protectRoute, createdRoom);
router.delete('/:id', protectRoute, removedRoom);
router.get('/:id', protectRoute, joinRoom);

export default router;

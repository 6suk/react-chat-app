import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import { getRoomsByUser, getRooms } from '../controllers/rooms.controller.js';

const router = express.Router();

router.get('/', protectRoute, getRooms);
router.get('/user', protectRoute, getRoomsByUser);

export default router;

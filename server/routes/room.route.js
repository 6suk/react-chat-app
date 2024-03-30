import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import { createdRoom } from '../controllers/room.controller.js';

const router = express.Router();

router.post('/create', protectRoute, createdRoom);

export default router;

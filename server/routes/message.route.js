import express from 'express';

import { getMessages, sendMessage } from '../controllers/message.controller.js';

import joinRoute from '../middleware/join.route.js';
import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.post('/send/:id', protectRoute, joinRoute, sendMessage);
router.get('/:id', protectRoute, joinRoute, getMessages);

export default router;

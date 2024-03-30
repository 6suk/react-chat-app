import express from 'express';
import protectRoute from '../middleware/protect.route.js';
import { otherUsersList } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute, otherUsersList);

export default router;

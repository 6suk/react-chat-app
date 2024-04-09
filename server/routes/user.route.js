import express from 'express';

import { getUser, getOtherUsers } from '../controllers/user.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.get('/', protectRoute, getOtherUsers);
router.get('/:id', getUser); // 임시

export default router;

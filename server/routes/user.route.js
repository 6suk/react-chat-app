import express from 'express';

import getOtherUsers from '../controllers/user.controller.js';

import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.get('/', protectRoute, getOtherUsers);

export default router;

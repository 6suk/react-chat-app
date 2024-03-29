import express from 'express';

import { login, logout } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protect.route.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', protectRoute, logout);

export default router;

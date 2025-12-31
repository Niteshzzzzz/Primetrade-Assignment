import express from 'express';
const router = express.Router();
import { getProfile } from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';

router.get('/profile', protect, getProfile);

export default router;

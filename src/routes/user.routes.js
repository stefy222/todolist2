import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post('/users', createUser);
router.post('/login',loginUser);

export default router;
import express from 'express';
import { createUser, login } from '../controllers/user.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/users', createUser);
router.post('/login',login);
router.use(authMiddleware);
export default router;
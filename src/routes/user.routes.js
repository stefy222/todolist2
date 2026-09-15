import express from 'express';
<<<<<<< HEAD
import { createUser, loginUser } from '../controllers/user.controller.js';
=======
import { createUser, login } from '../controllers/user.controller.js';
>>>>>>> origin/main
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

<<<<<<< HEAD
router.use(authMiddleware);
router.post('/users', createUser);
router.post('/login',loginUser);

=======
router.post('/users', createUser);
router.post('/login',login);
router.use(authMiddleware);
>>>>>>> origin/main
export default router;
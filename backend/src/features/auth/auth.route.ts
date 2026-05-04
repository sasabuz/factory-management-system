import express from 'express';
import { signUpController, checkAuth, loginController, logoutController } from './auth.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

export const authRouter = express.Router();


authRouter.post('/signup', signUpController);
authRouter.post('/login', loginController);
authRouter.get('/me', verifyToken, checkAuth);
authRouter.post('/logout', logoutController);
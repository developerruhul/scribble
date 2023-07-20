import AuthController from '@/controllers/auth';
import { Router } from 'express';

const authRoute = Router();
const controller = new AuthController();

authRoute.post('/register', controller.register);
authRoute.post('/login', controller.login);
authRoute.post('/forgot-password', controller.forgotPassword);
authRoute.patch('/reset-password', controller.resetPassword);
authRoute.post('/logout', controller.logout);
authRoute.post('/refresh-token', controller.refreshToken);

export default authRoute;

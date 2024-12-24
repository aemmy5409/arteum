import { Router } from "express";
import {registerHandler, verifyEmailHandler, loginHandler, logoutHandler, forgotPasswordHandler, resetPasswordHandler, checkAuthHandler} from '../controller/authHandler.js';
import { verifyToken } from "../middleware/checkAuth.js";
const router = Router();

router.post('/register', registerHandler);
router.post('/verify-email', verifyEmailHandler);
router.post('/login', loginHandler);
router.post('/check-auth', verifyToken, checkAuthHandler)
router.post('/forgot-password', forgotPasswordHandler);
router.post('reset-password/:token', resetPasswordHandler);
router.post('/logout', logoutHandler)
export default router
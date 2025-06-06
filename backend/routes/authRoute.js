import express from "express";

import {
	register,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	resendVerificationEmail,
	makeAdmin,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express().router;

router.post("/check-auth", verifyToken, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/resend-verification-email", verifyToken, resendVerificationEmail);
router.post("/admin", verifyToken, makeAdmin);

export default router;

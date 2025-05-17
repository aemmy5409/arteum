import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/userModel.js";
import { generateAndSetCookie } from "../utils/generateAndSetCookie.js";
import {
	sendResetPasswordSuccessfulEmail,
	sendResetPasswordEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
} from "../nodemailer/email.js";

export const register = async (req, res) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		throw new Error("All fields are required!");
	}

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				success: false,
				message: "User already exists, try logging in!",
			});
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const user = new User({
			email,
			name,
			password: hashedPassword,
			verificationToken,
			verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
		});

		await user.save();

		generateAndSetCookie(res, user._id);
		// await sendVerificationEmail(email, verificationToken);

		res.status(201).json({
			success: true,
			message: "User created successfully!",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (err) {
		return res.status(500).json({ success: false, error: err.message });
	}
};

export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: new Date(Date.now()) },
		});
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired verification token!",
			});
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;

		await user.save();
		// await sendWelcomeEmail();

		res.status(200).json({
			success: true,
			message: "Email verification successful",
			user: { ...user._doc, password: undefined },
		});
	} catch (err) {
		console.log(`Something went wrong at Verify-Email: ${err.message}`);
		return res.status(500).json({ success: false, error: err.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		const isValidPassword = await bcryptjs.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(400).json({
				success: false,
				message: "Invalid credentials, please check email and password again!",
			});
		}

		generateAndSetCookie(res, user._id);
		user.lastLogin = Date.now();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged-In successfully!",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (err) {
		console.log(`Error at login: `, err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "Lax",
		path: "/",
	});
	res.status(200).json({ success: true, message: "Logged out successfully!" });
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid or non-existing email!" });
		}

		const resetToken = crypto.randomBytes(20).toString("hex");
		console.log(resetToken);
		const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

		user.resetPassword = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// await sendResetPasswordEmail(
		// 	user.email,
		// 	`${process.env.CLIENT_URL}/reset-password/${resetToken}`
		// );
		res.status(200).json({
			success: true,
			message: "Password reset link sent to your email!",
		});
	} catch (err) {
		console.log(`Error at forgot password: `, err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		const user = await User.findOne({
			resetPassword: token,
			resetPasswordExpiresAt: { $gt: new Date(Date.now()) },
		});
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invald or expired reset token!",
			});
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPassword = undefined;
		user.resetPasswordExpiresAt = undefined;

		await user.save();
		// await sendResetPasswordSuccessfulEmail(user.email);

		res
			.status(200)
			.json({ success: true, message: "Password reset successful!" });
	} catch (err) {
		console.log("Error at reset password: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user)
			return res.status(400).json({
				success: false,
				message: "Failed to find user - doesn't exist!",
			});

		res
			.status(200)
			.json({ success: true, message: "User is authenticated!", user });
	} catch (err) {
		console.log("Error at check-auth: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const resendVerificationEmail = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(403).json({
				success: false,
				message: "Unauthenticated, try to login or register first",
			});
		}

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		user.verificationToken = verificationToken;
		user.verificationTokenExpiresAt = new Date(
			Date.now() + 24 * 60 * 60 * 1000
		);

		await user.save();
		//await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "Verification code sent successfully!",
			user: { ...user._doc, password: undefined },
		});
	} catch (err) {
		console.log("Error at resend verification email:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

export const makeAdmin = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(403).json({
				success: false,
				message: "Unauthenticated, try to login or register first",
			});
		}

		const { code } = req.body;
		if (code != 123456) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid code provided!" });
		}
		(user.isAdmin = true), await user.save();
		res.status(200).json({
			success: true,
			message: "Admin role added successfully!",
			user: { ...user._doc, password: undefined },
		});
	} catch (err) {
		console.log(err);
	}
};

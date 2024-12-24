import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { User } from '../models/User.js';
import { generateTokenandSetCookie } from "../utils/tokenCookie.js"
import { sendVerificationEmail, sendVerificationSuccessEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail} from '../nodemailer/email.js';

export const registerHandler = async(req, res) => {
	const {firstName, lastName, email, password} = req.body
	console.log(req.body);
	try {
		if(!email || !firstName || !lastName || !password) {
			throw new Error("All fields are required!")
		}

		const userExists = await User.findOne({email})
		if(userExists) {
			res.status(400).send("User already exists") //change to a redirect to the login page
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
		const user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			lastLogin: Date.now(),
			verificationToken,
			verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
		})
		await user.save()
		generateTokenandSetCookie(res, user._id);
		await sendVerificationEmail(user.email, verificationToken, firstName);

		res.status(201).json({
			success: true,
			message: "User was created!",
			user: {
				...user._doc,
				password: null
			}
		});
	} catch (err) {
		console.log(err)
		res.status(400).send({success: false, message: err.message});
	}
};

export const verifyEmailHandler = async(req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: new Date(Date.now()) }
		});
		if(!user) {
			console.log(user)
			res.status(400).json({success: false, message: "Invalid or expired verification code!"})
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendVerificationSuccessEmail(user.email, user.firstName);

		res.json({
			success: true,
			message: "Email Verification Successful!",
			user: {
				...user._doc,
				password: undefined
			}
		});
	} catch (err) {
		console.log(`Verifying Email Error: ${err}`);
		throw new Error(`Error verifying email: ${err.message}`);
	}
}

export const loginHandler = async(req, res) => {
	const {email, password} = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ success: false, message: "Invalid credentials!"});
		let passwordIsCorrect = bcrypt.compare(password, user.password);
		if(!passwordIsCorrect) {
			res.status(400).json({ success: false, message: "Invalid credentials!"})
		}
		
		generateTokenandSetCookie(res, user._id);
		
		user.lastLogin = Date.now();
		await user.save();

		res.json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined
			}
		});
		}
	} catch (err) {
		console.log(`Error on logIn: ${err}`)
		throw new Error(`Error on logIn: ${err.message}`);
	}
};

export const logoutHandler = async(_, res) => {
	res.clearCookie('token');
	res.status(200).json({ success: true, message: "You've successfully logged out!"});
};

export const forgotPasswordHandler = async(req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if(!user) {
			res.status(400).json({ success: false, message: "User does not exist" });
		}

		const passwordResetToken = crypto.randomBytes(20).toString('hex');
		user.resetPasswordToken = passwordResetToken;
		user.resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 100);

		await user.save();

		await sendPasswordResetEmail(email, `${process.env.CLIENT_URL}/api/reset-password/${passwordResetToken}`)
		res.json({
			success: true,
			message: "reset password initialized successfully"
		})
	} catch (err) {
		console.log(`Forgot Password Error: ${err}`);
		throw new Error(`Error reseting password: ${err.message}`);
	}
}

export const resetPasswordHandler = async(req, res) => {
	const { token } = req.params
	const { password } = req.body

	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: new Date(Date.now())}
		});
		if(!user) {
			res.status(400).json({ success: false, message:"Invalid or expired token!" });
		}
		
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;

		await user.save();
		await sendPasswordResetSuccessEmail(user.email);

		res.json({
			success: true,
			message: "Password reset successful!",
			user: {
				...user._docs,
				password: undefined
			}
		});
	} catch (err) {
		console.log(`Reset Password Error: ${err}`);
		throw new Error(`Error reseting password: ${err.message}`);
	}

}

export const checkAuthHandler = async(req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');
		if(!user) res.status(400).json({ success: false, message: "User not created!"});
		res.status(200).json({ success: true, user });
	} catch (err) {
		console.log(`Error checking authentication: ${err}`);
		res.status(400).json({ success: false, message: err.message});
	}
	
}
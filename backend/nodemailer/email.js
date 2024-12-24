import dotenv from 'dotenv';
import mailClient from "./mailConnection.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, VERIFICATION_SUCCESS_TEMPLATE } from "./emailTemplate.js";


dotenv.config();

const YEAR = new Date().getFullYear();

export const sendVerificationEmail = async(email, verificationToken, firstName) => {

	try {
		const msg = await mailClient.sendMail({
	  	from:'Arteum',
	  	to: email,
	  	subject: "Email Verification",
	  	html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken).replace('{firstName}', firstName).replace('{year}', YEAR).replace('{verifyUrl}', `${process.env.CLIENT_URL}/api/verify-email`)
		});
  
		console.log(`Message sent: ${msg.messageId}`);
	} catch (err) {
		console.log(`Error sending mail: ${err}`);
		throw new Error(`Error sending mail: ${err.message}`);
	}
	
}

export const sendVerificationSuccessEmail = async(email, firstName) => {
	try {
		const msg = await mailClient.sendMail({
	  	from:'Arteum',
	  	to: email,
	  	subject: "Email Verification Successful",
	  	html: VERIFICATION_SUCCESS_TEMPLATE.replace('{firstName}', firstName).replace('{year}', YEAR),
		});
  
		console.log(`Message sent: ${msg.messageId}`);
	} catch (err) {
		console.log(`Error sending mail: ${err}`);
		throw new Error(`Error sending verification success mail: ${err.message}`);
	}
}

export const sendPasswordResetEmail = async(email, resetPasswordUrl) => {
	try {
		const msg = await mailClient.sendMail({
			from: 'Arteum',
			to: email,
			subject: "Password Reset Request",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetUrl}', resetPasswordUrl)
		});
		console.log(`Message sent: ${msg.messageId}`);
	} catch (err) {
		console.log(`Error sending mail: ${err}`);
		throw new Error(`Error sending reset password email: ${err.message}`);
	}
}

export const sendPasswordResetSuccessEmail = async(email, redirectLink) => {
	try {
		const msg = await mailClient.sendMail({
			from: 'Arteum',
			to: email,
			subject: 'Password Reset Successful',
			html: PASSWORD_RESET_SUCCESS_TEMPLATE
		});
		console.log(`Message sent: ${msg.messageId}`);
	} catch (err) {
		console.log(`Error sending mail: ${err}`);
		throw new Error(`Error sending reset password success email: ${err.message}`);
	}
}
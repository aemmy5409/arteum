import { mailClient } from "./nodemailer.conf.js";
import {
	verificationEmailTemplate,
	welcomeEmailTemplate,
	resetPasswordEmailTemplate,
	resetPasswordSuccessfulEmailTemplate,
} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		// send mail with defined transport object
		const info = await mailClient.sendMail({
			from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
			to: email, // list of receivers
			subject: "Hello ✔", // Subject line
			html: verificationEmailTemplate.replace("{name}", email), // html body
			// text: "Hello world?", //plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	} catch (err) {
		console.log(`Error at sendVerificationMail: ${err}`);
	}
};

export const sendWelcomeEmail = async (email) => {
	try {
		// send mail with defined transport object
		const info = await mailClient.sendMail({
			from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
			to: email, // list of receivers
			subject: "Hello ✔", // Subject line
			html: welcomeEmailTemplate.replace("{name}", email), // html body
			// text: "Hello world?", //plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	} catch (err) {
		console.log(`Error at sendWelcomeEmail: ${err}`);
	}
};

export const sendResetPasswordEmail = async (email, token) => {
	try {
		// send mail with defined transport object
		const info = await mailClient.sendMail({
			from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
			to: email, // list of receivers
			subject: "Hello ✔", // Subject line
			html: resetPasswordEmailTemplate.replace("{name}", email), // html body
			// text: "Hello world?", //plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	} catch (err) {
		console.log(`Error at sendWelcomeEmail: ${err}`);
	}
};

export const sendResetPasswordSuccessfulEmail = async (email) => {
	try {
		// send mail with defined transport object
		const info = await mailClient.sendMail({
			from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
			to: email, // list of receivers
			subject: "Hello ✔", // Subject line
			html: resetPasswordSuccessfulEmailTemplate.replace("{name}", email), // html body
			// text: "Hello world?", //plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
	} catch (err) {
		console.log(`Error at sendWelcomeEmail: ${err}`);
	}
};

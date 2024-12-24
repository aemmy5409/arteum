import jwt from 'jsonwebtoken'

export const generateTokenandSetCookie = (res, userId) => {
	const token = jwt.sign({userId}, process.env.SECRET_KEY, {
		expiresIn: '7d'
	});
	res.cookie('cookie', token, {
		httpOnly: true,
		secure: process.env.ENVIRONMENT == "production",
		sameSite: "strict",
		maxAge: 7 * 60 * 60 * 1000
	});

	return token;
}
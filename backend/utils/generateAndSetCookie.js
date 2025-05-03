import jwt from "jsonwebtoken";

export const generateAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_KEY, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "Lax", //"strict"
		path: "/",
		maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
	});
};

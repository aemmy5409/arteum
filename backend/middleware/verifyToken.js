import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;
	if (!token)
		return res
			.status(400)
			.json({ success: false, message: "Unauthorized! - no token provided" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		if (!decoded)
			return res
				.status(400)
				.json({ success: false, message: "Wrong or altered token provided!" });

		req.userId = decoded.userId;
		next();
	} catch (err) {
		console.log("Error at verify token: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const admin = (req, res, next) => {
	if (req.userId?.isAdmin) {
		next();
	} else {
		res.status(403).json({ success: false, message: "Admin access denied" });
	}
};


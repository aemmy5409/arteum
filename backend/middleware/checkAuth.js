import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies.token;
		if(!token) return res.status(401).json({ success: false, message: "User not authenticated - no token provided!"});

		const decode = jwt.verify(token, process.env.SECRET_KEY);
		if(!decode) return res.status(401).json({ success: false, message: "User not authenticated - bad token!"});
		
		req.userId = decode.userId;
		next();
	} catch (err) {
		console.log(`Error authenticating user: ${err}`);
		res.status(500).json({ success: false, message: "Error authenticating user!"});
	}
	
}
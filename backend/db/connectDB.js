import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to database: ${conn.connection.host}`);
	} catch (err) {
		console.log(err.message);
		process.exit(1); // 0 equals no failure, 1 equals issue
	}
};

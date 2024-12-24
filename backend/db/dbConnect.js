import { mongoose } from "mongoose";

export async function dbConnect() {
	try {
		//ATLAS MONGO_URI = mongodb+srv://arteum:arteum@cluster0.ximcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
		console.log(`MongoDB url: ${process.env.MONGO_URL}`)
		const CONN = await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to Mongo database!: ", CONN.connection.host);
	} catch (err) {
		console.log(`Error connecting to Mongodb: ${err.message}`);
		console.log(err)
		process.exit(1);
	}
};
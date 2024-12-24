import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	price: {
		type: Number,
		required: true
	},
	slug: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
}, {timestamps: true});

export const Product =  mongoose.model('Products', productSchema)
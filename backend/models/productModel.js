import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		image: {
			type: String,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
			min: 0,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
		},
		numReview: {
			type: Number,
			required: true,
			min: 0,
		},
		artist: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

import { Product } from "../models/productModel.js";

export const productList = async (req, res) => {
	try {
		const product = await Product.find();
		res.status(200).json({
			success: true,
			message: "Fetched all products!",
			products: product,
		});
	} catch (err) {
		console.log(`Error at productlist: `, err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const productDetail = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product)
			return res
				.status(400)
				.json({ success: false, message: "Wrong id! Product does not exist" });

		res.status(200).json({
			success: true,
			message: "Product fetched successfully",
			product,
		});
	} catch (err) {
		console.log("Error at product detail: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

export const addProduct = async (req, res) => {
	const {
		name,
		description,
		price,
		image,
		countInStock,
		rating,
		numReview,
		color,
	} = req.body;
	if (
		!name ||
		!description ||
		!price ||
		!image ||
		!countInStock ||
		!rating ||
		!numReview ||
		!color
	)
		throw new Error("All fields are required!");

	try {
		const product = new Product({
			name,
			description,
			price,
			image,
			countInStock,
			rating,
			numReview,
			color,
		});

		await product.save();
		res
			.status(201)
			.json({ success: true, message: "Product created!", product });
	} catch (err) {
		console.log("Error at addProduct: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

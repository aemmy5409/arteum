import multer from "multer";
import path from "path";

import { Product } from "../models/productModel.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // save in 'uploads' folder
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g. 123456789.jpg
	},
});

export const upload = multer({ storage: storage });

export const addProduct = async (req, res) => {
	const { name, description, price, countInStock, rating, numReview, artist } =
		req.body;
	const imagePath = req.file ? req.file.path : null;
	if (
		!name ||
		!description ||
		!price ||
		!imagePath ||
		!countInStock ||
		!rating ||
		!numReview ||
		!artist
	)
		throw new Error("All fields are required!");

	try {
		const product = new Product({
			name,
			description,
			price,
			image: imagePath,
			countInStock,
			rating,
			numReview,
			artist,
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

export const productList = async (req, res) => {
	try {
		const products = await Product.find();
		const productsWithImageUrl = products.map((product) => ({
			...product.toObject(),
			image: `${req.protocol}://${req.get("host")}/${product.image}`,
		}));
		res.status(200).json({
			success: true,
			message: "Fetched all products!",
			products: productsWithImageUrl,
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
		const fullImageUrl = `${req.protocol}://${req.get("host")}/${
			product.image
		}`;
		if (!product)
			return res
				.status(400)
				.json({ success: false, message: "Wrong id! Product does not exist" });

		res.status(200).json({
			success: true,
			message: "Product fetched successfully",
			product: { ...product._doc, image: fullImageUrl },
		});
	} catch (err) {
		console.log("Error at product detail: ", err);
		return res.status(500).json({ success: false, message: err.message });
	}
};

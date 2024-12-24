import { Product } from '../models/Product.js';

export const getAllProducts = async(req, res) => {
	
}

export const productCreationHandler = async(req, res) => {
	const { title, image, price, slug, description } = req.body
	console.log(req.body);
	try {
		if (!title || !price || !slug || !description || !image) {
			throw new Error("Error: Missing values, kindly fill all");
		}

		const productExists = await Product.find({title})
		if(productExists) {
			res.status(400).json({
				success: false,
				message: 'Product already exists!'
			})
		}
		const product = new Product({
			title,
			price,
			slug,
			description,
			image
		});
		
		await product.save();

		res.status(201).json({
			success: true,
			message: "Product was created!",
			product
		});

	} catch (err) {
		console.log(err)
		res.status(400).send({success: false, message: err.message});
	}
	
}
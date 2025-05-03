import Cart from "../models/cartModel.js";
import {Product} from "../models/productModel.js";

// GET /api/cart - get user's cart
export const getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ user: req.userId }).populate(
		"items.product"
	);
	if (!cart) return res.status(200).json({ items: [] });
	res.json(cart);
	} catch (err) {
		console.log(`Error: ${err}`)
		res.status(500).json({success: false, message: `Error occured at server: ${err}`})
	}
	
};

// POST /api/cart - add or update items in cart
export const updateCart = async (req, res) => {
	try {
		const { productId, quantity } = req.body;

	const product = await Product.findById(productId);
	if (!product) {
		return res.status(404).json({ message: "Product not found" });
	}

	let cart = await Cart.findOne({ user: req.userId });

	if (!cart) {
		cart = new Cart({ user: req.userId, items: [] });
	}

	const productExists = cart.items.find(
		(item) => item.product.toString() === productId
	);

	if (productExists) {
		productExists.quantity = quantity;
	} else {
		cart.items.push({ product: productId, quantity });
	}

	await cart.save();
	res.json(cart);
	} catch (err) {
		console.log(err.message)
		res.status(500).json({success: false, message: `Error occured at server: ${err}`})
	}
	
};

// DELETE /api/cart - clear the cart
export const clearCart = async (req, res) => {
	try {
		await Cart.findOneAndDelete({ user: req.userId });
		res.json({ message: "Cart cleared" });
	} catch (err) {
		console.log(err.message)
		res.status(500).json({success: false, message: `Error occured at server: ${err}`})
	}
};

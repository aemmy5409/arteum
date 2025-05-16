import Cart from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

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

		await cart.populate("items.product");

		res.json(cart);
	} catch (err) {
		console.log(err.message);
		res
			.status(500)
			.json({ success: false, message: `Error occurred at server: ${err}` });
	}
};

// DELETE /api/cart/:productId - remove one product from the cart
export const removeFromCart = async (req, res) => {
	try {
		const { productId } = req.params;

		let cart = await Cart.findOne({ user: req.userId });

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		const initialLength = cart.items.length;

		cart.items = cart.items.filter(
			(item) => item.product.toString() !== productId
		);

		if (cart.items.length === initialLength) {
			return res.status(404).json({ message: "Product not in cart" });
		}

		await cart.save();
		await cart.populate("items.product");

		res.json(cart);
	} catch (err) {
		console.log(err.message);
		res
			.status(500)
			.json({ success: false, message: `Error occurred at server: ${err}` });
	}
};

// DELETE /api/cart - clear the cart
export const clearCart = async (req, res) => {
	try {
		await Cart.findOneAndDelete({ user: req.userId });
		res.json({ message: "Cart cleared" });
	} catch (err) {
		console.log(err.message);
		res
			.status(500)
			.json({ success: false, message: `Error occured at server: ${err}` });
	}
};

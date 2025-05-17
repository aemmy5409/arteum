import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// POST /api/orders - create new order from cart
export const createOrder = async (req, res) => {
	const { shippingAddress, paymentMethod } = req.body;

	try {
		const cart = await Cart.findOne({ user: req.userId }).populate(
			"items.product"
		);
		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ message: "Cart is empty" });
		}

		const addDecimal = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};

		const subTotal = cart.items.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		);

		const taxPrice = addDecimal(Number(0.15 * subTotal).toFixed(2));
		const shippingPrice = addDecimal(subTotal > 100 ? 0 : 20);

		const totalPrice = (
			Number(subTotal) +
			Number(taxPrice) +
			Number(shippingPrice)
		).toFixed(2);

		const order = new Order({
			user: req.userId,
			items: cart.items,
			shippingAddress,
			paymentMethod,
			totalPrice,
		});

		const createdOrder = await order.save();

		await Cart.findOneAndDelete({ user: req.userId }); // Clear cart after order

		res.status(201).json(createdOrder);
	} catch (err) {
		console.log("Error at creating order:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

// GET /api/orders/my - get current user's orders
export const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.userId });
		res.json(orders);
	} catch (err) {
		console.log("Error at get my order:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

// GET /api/orders/:id - get order by ID
export const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id).populate("items.product");
		if (!order) return res.status(404).json({ message: "Order not found" });
		res.json(order);
	} catch (err) {
		console.log("Error at get my order by id:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

// PUT /api/orders/:id/pay - mark as paid
export const markAsPaid = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) return res.status(404).json({ message: "Order not found" });

		order.isPaid = true;
		order.paidAt = Date.now();
		const updated = await order.save();

		res.json(updated);
	} catch (err) {
		console.log("Error at mark as paid:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

// PUT /api/orders/:id/deliver - admin marks as delivered
export const markAsDelivered = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		if (!order) return res.status(404).json({ message: "Order not found" });

		order.isDelivered = true;
		order.deliveredAt = Date.now();
		const updated = await order.save();

		res.json(updated);
	} catch (err) {
		console.log("Error at mark as delivered:", err);
		res.status(500).json({ success: false, message: err.message });
	}
};

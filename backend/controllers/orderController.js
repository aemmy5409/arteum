import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// POST /api/orders - create new order from cart
export const createOrder = async (req, res) => {
	const { shippingAddress, paymentMethod } = req.body;

	const cart = await Cart.findOne({ user: req.userId }).populate(
		"items.product"
	);
	if (!cart || cart.items.length === 0) {
		return res.status(400).json({ message: "Cart is empty" });
	}

	const totalPrice = cart.items.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	const order = new Order({
		user: req.user._id,
		items: cart.items,
		shippingAddress,
		paymentMethod,
		totalPrice,
	});

	const createdOrder = await order.save();

	await Cart.findOneAndDelete({ user: req.userId }); // Clear cart after order

	res.status(201).json(createdOrder);
};

// GET /api/orders/my - get current user's orders
export const getMyOrders = async (req, res) => {
	const orders = await Order.find({ user: req.userId });
	res.json(orders);
};

// GET /api/orders/:id - get order by ID
export const getOrderById = async (req, res) => {
	const order = await Order.findById(req.params.id).populate("items.product");
	if (!order) return res.status(404).json({ message: "Order not found" });
	res.json(order);
};

// PUT /api/orders/:id/pay - mark as paid
export const markAsPaid = async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (!order) return res.status(404).json({ message: "Order not found" });

	order.isPaid = true;
	order.paidAt = Date.now();
	const updated = await order.save();

	res.json(updated);
};

// PUT /api/orders/:id/deliver - admin marks as delivered
export const markAsDelivered = async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (!order) return res.status(404).json({ message: "Order not found" });

	order.isDelivered = true;
	order.deliveredAt = Date.now();
	const updated = await order.save();

	res.json(updated);
};

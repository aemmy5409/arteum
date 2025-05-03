import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		items: [orderItemSchema],
		shippingAddress: {
			fullName: String,
			address: String,
			city: String,
			postalCode: String,
			country: String,
		},
		paymentMethod: { type: String, required: true },
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, default: false },
		deliveredAt: { type: Date },
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);

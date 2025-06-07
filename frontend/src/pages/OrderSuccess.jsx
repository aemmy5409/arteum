import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = () => {
	const navigate = useNavigate();
	const { orderId } = useParams();

	return (
		<div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
			<h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-500">
				🎉 Payment Successful!
			</h1>
			<p className="text-lg md:text-xl mb-2 max-w-md text-gray-700">
				Thank you for your order. Your payment has been processed successfully.
			</p>
			{orderId && (
				<p className="text-md mb-8 text-gray-600">
					Your Order ID:{" "}
					<span className="font-mono font-semibold">{orderId}</span>
				</p>
			)}
			<button
				onClick={() => navigate("/")}
				className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-300"
			>
				Continue Shopping
			</button>
		</div>
	);
};

export default OrderSuccess;

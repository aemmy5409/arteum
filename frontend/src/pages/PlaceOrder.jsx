import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import { createOrder } from "../state/order/orderActions";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cartReducer);
	const { cartItems, shippingAddress } = cart;

	const addDecimal = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const subTotal = addDecimal(
		cartItems.reduce((total, item) => total + item.qty * item.price, 0)
	);
	const taxPrice = addDecimal(Number(0.15 * subTotal).toFixed(2));
	const shippingPrice = addDecimal(subTotal > 100 || subTotal == 0 ? 0 : 20);

	const total = (
		Number(subTotal) +
		Number(taxPrice) +
		Number(shippingPrice)
	).toFixed(2);

	const [clientId, setClientId] = useState(null);

	useEffect(() => {
		getPayPalClientId();
	});

	const getPayPalClientId = async () => {
		const { data } = await axios.get(
			`${import.meta.env.VITE_API_URL}/dev/paypal`
		);
		setClientId(data);
	};

	const dispatch = useDispatch();

	const successPaymentHandler = async () => {
		try {
			const { _id } = await dispatch(
				createOrder({
					shipping: cart.shippingAddress,
					paymentMethod: "paypal",
				})
			);
			navigate(`/order-success/${_id}`);
		} catch (err) {
			console.log(err);
		}
	};

	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	return (
		<Layout>
			<section class="text-gray-600 body-font overflow-hidden">
				<div class="container px-5 py-24 mx-auto">
					<div class="lg:w-4/5 mx-auto flex flex-wrap">
						<div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
							<h2 class="text-lg title-font text-gray-500 tracking-widest">
								ORDER SUMMARY
							</h2>
							<div class="leading-relaxed mb-4">
								<CartItem cartItems={cartItems}></CartItem>
							</div>

							<div class="flex border-t border-gray-200 py-2">
								<span class="text-gray-500">Sub Total</span>
								<span class="ml-auto text-gray-900">${subTotal}</span>
							</div>
							<div class="flex border-t border-gray-200 py-2">
								<span class="text-gray-500">Tax Price</span>
								<span class="ml-auto text-gray-900">${taxPrice}</span>
							</div>
							<div class="flex border-t border-b mb-6 border-gray-200 py-2">
								<span class="text-gray-500">Shipping Fee</span>
								<span class="ml-auto text-gray-900">${shippingPrice}</span>
							</div>
							<div class="flex">
								<span class="title-font font-medium text-2xl text-gray-900">
									${total}
								</span>
							</div>
						</div>
						<div class="lg:w-1/3 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
							<h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
								Shipping Address
							</h2>
							<div class="relative mb-4">
								<label
									for="fullName"
									class="block leading-7 text-sm text-gray-600 text-left"
								>
									Full Name
								</label>
								<input
									type="text"
									id="fullName"
									name="fullName"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
							<div class="relative mb-4">
								<label
									for="address"
									class="block leading-7 text-sm text-gray-600 text-left"
								>
									Address
								</label>
								<input
									type="text"
									id="address"
									name="address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
							<div class="relative mb-4">
								<label
									for="city"
									class="block leading-7 text-sm text-gray-600 text-left"
								>
									City
								</label>
								<input
									type="text"
									id="city"
									name="city"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
							<div class="relative mb-4">
								<label
									for="postalCode"
									class="block leading-7 text-sm text-gray-600 text-left"
								>
									Postal Code
								</label>
								<input
									type="text"
									id="postalCode"
									name="postalCode"
									value={postalCode}
									onChange={(e) => setPostalCode(e.target.value)}
									class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
							<div class="relative mb-4">
								<label
									for="country"
									class="block leading-7 text-sm text-gray-600 text-left"
								>
									Country
								</label>
								<input
									type="text"
									id="country"
									name="country"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
							{clientId && (
								<PayPalScriptProvider options={{ clientId: clientId }}>
									<PayPalButtons
										createOrder={(data, actions) => {
											return actions.order.create({
												purchase_units: [
													{
														amount: {
															currency_code: "USD",
															value: total,
														},
													},
												],
											});
										}}
										onApprove={(data, actions) => {
											return actions.order.capture().then((details) => {
												successPaymentHandler(details);
											});
										}}
									/>
								</PayPalScriptProvider>
							)}
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default PlaceOrder;

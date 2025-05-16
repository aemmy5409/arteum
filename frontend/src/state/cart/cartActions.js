import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding to cart
const BASE_URL = import.meta.url.VITE_API_URL;

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ id, qty }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/cart`,
				{ productId: id, quantity: qty },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			// Find the product you just added/updated
			const addedItem = data.items.find((item) => item.product._id === id);

			if (!addedItem) {
				throw new Error("Item not found in returned cart data.");
			}

			const { product, quantity } = addedItem;

			return {
				product: product._id,
				name: product.name,
				image: product.image,
				price: product.price,
				countInStock: product.countInStock,
				color: product.color,
				qty: quantity, // From the returned cart
			};
		} catch (err) {
			return rejectWithValue(err.response?.data.message || err.message);
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async (productId, { rejectWithValue }) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${productId}`, {
				withCredentials: true,
			});
			return productId;
		} catch (err) {
			return rejectWithValue(err.response?.data.message || err.message);
		}
	}
);

export const clearCart = createAsyncThunk(
	"cart/clearCart",
	async (_, { rejectWithValue }) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/cart`, {
				withCredentials: true,
			});
			return;
		} catch (err) {
			return rejectWithValue(err.response?.data.message || err.message);
		}
	}
);

// import {
// 	ADD_ITEM_TO_CART,
// 	REMOVE_ITEM_FROM_CART,
// 	CART_ITEM_CLEAR,
// 	CART_SAVE_SHIPPING_ADDRESS,
// 	SAVE_PAYMENT_METHOD,
// } from "../constants";

// const BASE_URL = import.meta.url.VITE_API_URL;

// export const AddToCartAction = (id, qty) => async (dispatch, getState) => {
// 	try {
// 		const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
// 		dispatch({
// 			type: ADD_ITEM_TO_CART,
// 			payload: {
// 				product: data._id,
// 				name: data.name,
// 				image: data.image,
// 				price: data.price,
// 				countInStock: data.countInStock,
// 				qty,
// 			},
// 		});
// 		const cartItems = getState().cartReducers.cartItems;
// 		localStorage.setItem("cartItems", JSON.stringify(cartItems));
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const removeFromCartAction = (id) => (dispatch, getState) => {
// 	dispatch({
// 		type: REMOVE_ITEM_FROM_CART,
// 		payload: id,
// 	});
// 	localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
// };

// export const saveShippingAddressAction = (data) => (dispatch) => {
// 	dispatch({
// 		type: CART_SAVE_SHIPPING_ADDRESS,
// 		payload: data,
// 	});

// 	localStorage.setItem(("shippingAddress", JSON.stringify(data)));
// };

// export const savePaymentMethodAction = (data) => (dispatch) => {
// 	dispatch({
// 		type: SAVE_PAYMENT_METHOD,
// 		payload: data,
// 	});

// 	localStorage.setItem(("PaymentMethod", JSON.stringify(data)));
// };

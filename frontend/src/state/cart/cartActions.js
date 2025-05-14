import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding to cart
const BASE_URL = import.meta.url.VITE_API_URL;
export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ id, qty }, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${id}`
			);
			return {
				product: data.product._id,
				name: data.product.name,
				image: data.product.image,
				price: data.product.price,
				countInStock: data.product.countInStock,
				color: data.product.color,
				qty,
			};
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

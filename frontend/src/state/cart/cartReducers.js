import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

import { addToCart, removeFromCart, clearCart } from "./cartActions";

const cartConfig = {
	key: "cart",
	storage,
	whitelist: ["cartItems"],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
		shippingAddress: {},
		paymentMethod: "",
	},
	reducers: {
		// removeFromCart: (state, action) => {
		// 	state.cartItems = state.cartItems.filter(
		// 		(item) => item.product !== action.payload
		// 	);
		// },
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
		},
		// clearCart: (state) => {
		// 	state.cartItems = [];
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.fulfilled, (state, action) => {
				const item = action.payload;
				const existItem = state.cartItems.find(
					(x) => x.product === item.product
				);

				if (existItem) {
					state.cartItems = state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					);
				} else {
					state.cartItems.push(item);
				}
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.cartItems = state.cartItems.filter(
					(item) => item.product !== action.payload
				);
			})
			.addCase(clearCart.fulfilled, (state) => {
				state.cartItems = [];
			});
	},
});

export const { saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export const cartReducer = persistReducer(cartConfig, cartSlice.reducer);

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_URL;

// export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
// 	const { data } = await axios.get(`${API_BASE}/api/cart`);
// 	return data.items; // assuming response is { items: [...] }
// });

// export const addOrUpdateCartItem = createAsyncThunk(
// 	'cart/addOrUpdateCartItem',
// 	async ({ productId, quantity }) => {
// 		const { data } = await axios.post(`${API_BASE}/api/cart`, { productId, quantity });
// 		return data.items;
// 	}
// );

// export const clearCart = createAsyncThunk('cart/clearCart', async () => {
// 	await axios.delete(`${API_BASE}/api/cart`);
// 	return [];
// });

// const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState: {
// 		items: [],
// 		status: 'idle',
// 		error: null,
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchCart.fulfilled, (state, action) => {
// 				state.items = action.payload;
// 			})
// 			.addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
// 				state.items = action.payload;
// 			})
// 			.addCase(clearCart.fulfilled, (state) => {
// 				state.items = [];
// 			});
// 	},
// });

// export default cartSlice.reducer;

// features/order/orderSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_URL;

// export const createOrder = createAsyncThunk(
// 	'order/createOrder',
// 	async ({ shippingAddress, paymentMethod }) => {
// 		const { data } = await axios.post(`${API_BASE}/api/orders`, {
// 			shippingAddress,
// 			paymentMethod,
// 		});
// 		return data;
// 	}
// );

// export const fetchMyOrders = createAsyncThunk('order/fetchMyOrders', async () => {
// 	const { data } = await axios.get(`${API_BASE}/api/orders/my`);
// 	return data;
// });

// export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (id) => {
// 	const { data } = await axios.get(`${API_BASE}/api/orders/${id}`);
// 	return data;
// });

// export const markOrderPaid = createAsyncThunk('order/markOrderPaid', async (id) => {
// 	const { data } = await axios.put(`${API_BASE}/api/orders/${id}/pay`);
// 	return data;
// });

// export const markOrderDelivered = createAsyncThunk('order/markOrderDelivered', async (id) => {
// 	const { data } = await axios.put(`${API_BASE}/api/orders/${id}/deliver`);
// 	return data;
// });

// const orderSlice = createSlice({
// 	name: 'order',
// 	initialState: {
// 		currentOrder: null,
// 		myOrders: [],
// 		status: 'idle',
// 		error: null,
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(createOrder.fulfilled, (state, action) => {
// 				state.currentOrder = action.payload;
// 			})
// 			.addCase(fetchMyOrders.fulfilled, (state, action) => {
// 				state.myOrders = action.payload;
// 			})
// 			.addCase(fetchOrderById.fulfilled, (state, action) => {
// 				state.currentOrder = action.payload;
// 			})
// 			.addCase(markOrderPaid.fulfilled, (state, action) => {
// 				state.currentOrder = action.payload;
// 			})
// 			.addCase(markOrderDelivered.fulfilled, (state, action) => {
// 				state.currentOrder = action.payload;
// 			});
// 	},
// });

// export default orderSlice.reducer;

// import {
// 	ADD_ITEM_TO_CART,
// 	REMOVE_ITEM_FROM_CART,
// 	CART_ITEM_CLEAR,
// 	CART_SAVE_SHIPPING_ADDRESS,
// 	SAVE_PAYMENT_METHOD,
// } from "../constants";

// export const cartReducer = (
// 	state = { cartItems: [], shippingAddress: {} },
// 	action
// ) => {
// 	switch (action.type) {
// 		case ADD_ITEM_TO_CART:
// 			const item = action.payload;
// 			const existItem = state.cartItems.find((x) => x.product === item.product);
// 			if (existItem) {
// 				return {
// 					...state,
// 					cartItems: state.cartItems.map((x) => {
// 						return x.product === existItem.product ? item : x;
// 					}),
// 				};
// 			} else {
// 				return {
// 					...state,
// 					cartItems: { ...state.cartItems, item },
// 				};
// 			}

// 		case REMOVE_ITEM_FROM_CART:
// 			return {
// 				...state,
// 				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
// 			};
// 		case CART_SAVE_SHIPPING_ADDRESS:
// 			return { ...state, shippingAddress: action.payload };
// 		case SAVE_PAYMENT_METHOD:
// 			return { ...state, paymentMethod: action.payload };
// 		case CART_ITEM_CLEAR:
// 			return { ...state, cartItems: [] };
// 		default:
// 			return state;
// 	}
// };

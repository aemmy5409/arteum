import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userLogout } from "../user/authActions";
import { clearCart } from "../cart/cartActions";

const BASE_URL = import.meta.env.VITE_API_URL;

const config = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};
// Async actions
export const createOrder = createAsyncThunk(
	"order/create",
	async (order, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${BASE_URL}/orders`, order, config);
			dispatch(clearCart()); // Dispatch the clearCart action
			return data;
		} catch (err) {
			return rejectWithValue(err.response?.data?.message || err.message);
		}
	}
);

export const payOrder = createAsyncThunk(
	"order/pay",
	async ({ orderId, paymentResult }, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${BASE_URL}/orders/${orderId}/pay`,
				paymentResult,
				config
			);
			dispatch(fetchOrderDetails(orderId));
			return data;
		} catch (err) {
			const message = err.response?.data?.message || err.message;
			if (message === "Not authorized!") {
				dispatch(userLogout());
			}
			return rejectWithValue(message);
		}
	}
);

export const fetchOrderDetails = createAsyncThunk(
	"order/details",
	async (orderId, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`, config);
			return data;
		} catch (err) {
			const message = err.response?.data?.message || err.message;
			if (message === "Not authorized!") {
				dispatch(userLogout());
			}
			return rejectWithValue(message);
		}
	}
);

export const fetchOrderList = createAsyncThunk(
	"order/list",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/orders/my`, config);
			return data;
		} catch (err) {
			const message = err.response?.data?.message || err.message;
			if (message === "Not authorized!") {
				dispatch(userLogout());
			}
			return rejectWithValue(message);
		}
	}
);

import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import {
	createOrder,
	payOrder,
	fetchOrderDetails,
	fetchOrderList,
} from "./orderActions";

const orderConfig = {
	key: "order",
	storage,
	blacklist: ["loading", "error", "success"],
};

const orderSlice = createSlice({
	name: "order",
	initialState: {
		order: {},
		orderDetails: {
			loading: true,
			shippingAddress: {},
			orderItems: {},
		},
		orderPayment: {},
		orderList: {
			orders: [],
		},
		success: false,
		loading: false,
		error: null,
	},
	reducers: {
		resetOrder: (state) => {
			state.order = {};
			state.success = false;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Create Order
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.success = false;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.order = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Pay Order
			.addCase(payOrder.pending, (state) => {
				state.orderPayment = { loading: true };
			})
			.addCase(payOrder.fulfilled, (state, action) => {
				state.orderPayment = {
					loading: false,
					success: true,
					order: action.payload,
				};
			})
			.addCase(payOrder.rejected, (state, action) => {
				state.orderPayment = {
					loading: false,
					error: action.payload,
				};
			})

			// Fetch Order Details
			.addCase(fetchOrderDetails.pending, (state) => {
				state.orderDetails.loading = true;
			})
			.addCase(fetchOrderDetails.fulfilled, (state, action) => {
				state.orderDetails = {
					loading: false,
					success: true,
					order: action.payload,
				};
			})
			.addCase(fetchOrderDetails.rejected, (state, action) => {
				state.orderDetails = {
					loading: false,
					error: action.payload,
				};
			})

			// Fetch Order List
			.addCase(fetchOrderList.pending, (state) => {
				state.orderList.loading = true;
			})
			.addCase(fetchOrderList.fulfilled, (state, action) => {
				state.orderList = {
					loading: false,
					success: true,
					orders: action.payload,
				};
			})
			.addCase(fetchOrderList.rejected, (state, action) => {
				state.orderList = {
					loading: false,
					error: action.payload,
				};
			});
	},
});

export const orderReducer = persistReducer(orderConfig, orderSlice.reducer);
export const { resetOrder } = orderSlice.actions;

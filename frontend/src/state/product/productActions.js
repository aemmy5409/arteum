import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Async thunk for fetching product list
export const productListAction = createAsyncThunk(
	"productList/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/products`
			);
			return { products: data.products, totalPage: 1, page: 1 }; // Adjusted to match your structure
		} catch (err) {
			return rejectWithValue(err.response?.data.message || err.message);
		}
	}
);

// Async thunk for fetching a single product detail
export const productAction = createAsyncThunk(
	"product/fetchDetail",
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${id}`
			); // Adjusted for proper filtering
			const product = data.product;
			if (!product) throw new Error("Product not found");
			return product;
		} catch (err) {
			return rejectWithValue(err.response?.data.message || err.message);
		}
	}
);

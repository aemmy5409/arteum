import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// import { BASE_URL } from "../constants";

export const userLogin = createAsyncThunk(
	"auth/userLogin",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{ email, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const userRegister = createAsyncThunk(
	"auth/userRegister",
	async ({ email, name, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/register`,
				{ email, name, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

export const userLogout = createAsyncThunk(
	"auth/userLogout",
	async (_, { rejectWithValue }) => {
		// No localStorage cleanup here — redux-persist will handle it if you purge
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/logout`,
				{},
				{ withCredentials: true }
			);
			localStorage.clear();
			return {};
		} catch (err) {
			return rejectWithValue(err.response.data.message);
		}
	}
);

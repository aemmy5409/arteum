import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, userLogout } from "./authActions";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const authConfig = {
	key: "auth",
	storage,
	blacklist: ["loading", "error"],
};

const initialState = {
	userInfo: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(userRegister.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(userRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(userLogout.fulfilled, (state) => {
				state.userInfo = null;
				state.loading = false;
				state.error = null;
			})
			.addCase(userLogout.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const authReducer = persistReducer(authConfig, authSlice.reducer);

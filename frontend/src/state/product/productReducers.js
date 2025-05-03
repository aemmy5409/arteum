import { createSlice } from "@reduxjs/toolkit";
import { productListAction, productAction } from "./productActions"; // Import async actions
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const productConfig = {
	key: "product",
	storage,
	blacklist: ["loading", "error"],
};

// const productListConfig = {
// 	key: "productList",
// 	storage,
// 	blacklist: ["loading", "error"],
// };

const initialProductListState = {
	products: [],
	loading: false,
	error: null,
	totalPage: 0,
	page: 1,
};

const initialProductState = {
	product: null,
	loading: false,
	error: null,
};

const productListSlice = createSlice({
	name: "productList",
	initialState: initialProductListState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(productListAction.pending, (state) => {
				state.loading = true;
				state.products = [];
			})
			.addCase(productListAction.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.totalPage = action.payload.totalPage;
				state.page = action.payload.page;
			})
			.addCase(productListAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

const productSlice = createSlice({
	name: "product",
	initialState: initialProductState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(productAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(productAction.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addCase(productAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// export const rootReducer = combineReducers({
// 	productList: productListSlice.reducer,
// 	product: productSlice.reducer,
// });

export const productList = persistReducer(
	productConfig,
	productListSlice.reducer
);
export const product = persistReducer(productConfig, productSlice.reducer);

import { combineReducers } from "@reduxjs/toolkit";
import { productList, product } from "./product/productReducers";
import { authReducer } from "./user/authReducers";
import {cartReducer } from "./cart/cartReducers";

export const rootReducer = combineReducers({
	productList,
	product,
	authReducer,
	cartReducer,
});

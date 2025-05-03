import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { rootReducer } from "./rootReducers"; // Root reducer is now simplified

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable the serializable check
		}),
});

export const persistor = persistStore(store);

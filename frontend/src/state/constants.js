// src/features/order/orderSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// // Async action to create an order
// export const createOrder = createAsyncThunk(
//   "order/create",
//   async (order, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${BASE_URL}/orders`, order, config);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState: {
//     order: {},
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     resetOrder: (state) => {
//       state.order = {};
//       state.success = false;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Order
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.order = action.payload;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetOrder } = orderSlice.actions;

// export default orderSlice.reducer;

// src/features/order/orderDetailsSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// // Async action to fetch order details
// export const fetchOrderDetails = createAsyncThunk(
//   "order/details",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`, config);
//       return data;
//     } catch (err) {
//       const message = err.response?.data?.message || err.message;
//       return rejectWithValue(message);
//     }
//   }
// );

// const orderDetailsSlice = createSlice({
//   name: "orderDetails",
//   initialState: {
//     order: {},
//     loading: true,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Order Details
//       .addCase(fetchOrderDetails.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrderDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload;
//       })
//       .addCase(fetchOrderDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default orderDetailsSlice.reducer;

// src/features/order/orderPaymentSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// // Async action to pay for an order
// export const payOrder = createAsyncThunk(
//   "order/pay",
//   async ({ orderId, paymentResult }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `${BASE_URL}/orders/${orderId}/pay`,
//         paymentResult,
//         config
//       );
//       return data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message;
//       return rejectWithValue(message);
//     }
//   }
// );

// const orderPaymentSlice = createSlice({
//   name: "orderPayment",
//   initialState: {
//     order: {},
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       // Pay Order
//       .addCase(payOrder.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(payOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload;
//       })
//       .addCase(payOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default orderPaymentSlice.reducer;

// src/features/order/orderListSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// // Async action to fetch the list of orders
// export const fetchOrderList = createAsyncThunk(
//   "order/list",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`${BASE_URL}/orders/my`, config);
//       return data;
//     } catch (err) {
//       const message =
//         err.response?.data?.message || err.message;
//       return rejectWithValue(message);
//     }
//   }
// );

// const orderListSlice = createSlice({
//   name: "orderList",
//   initialState: {
//     orders: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Order List
//       .addCase(fetchOrderList.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrderList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrderList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default orderListSlice.reducer;

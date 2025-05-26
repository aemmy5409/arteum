import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Logout from "./pages/Logout";
import Checkout from "./pages/Checkout";
import PlaceOrder from "./pages/PlaceOrder";
// import ErrorBoundary from "./ErrorBoundary";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import OrderHistory from "./pages/OrderHistory";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/products/:id" element={<ProductDetail />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/logout" element={<Logout />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/checkout" element={<Checkout />} />
					<Route exact path="/placeorder" element={<PlaceOrder />} />
					<Route exact path="/order-history" element={<OrderHistory />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

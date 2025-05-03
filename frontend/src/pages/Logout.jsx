import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Logout = () => {
	return (
		<Layout>
			<h1>User successfully logout!</h1>
			<Link to="/login">Login</Link>
		</Layout>
	);
};

export default Logout;

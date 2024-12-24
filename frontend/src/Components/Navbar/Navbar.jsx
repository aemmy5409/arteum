import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import "./Navbar.css";
import logo from "../../assets/arteum.png";
import cart_icon from "../../assets/cart_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {

	const [menu, setMenu] = useState('home');
	const {getTotalCartItems} = useContext(ShopContext);

	return (
		<nav className="navbar">
			<div className="nav-logo">
				<img src={logo} alt="arteum-logo" />
			</div>
			<ul className="nav-menu">
				<li onClick={()=>{setMenu('home')}}><Link style={{textDecoration: 'none', color: 'black'}} to='/' >Home</Link> {menu==='home'?<hr/>:<></>}</li>
				<li onClick={()=>{setMenu('about')}}><Link style={{textDecoration: 'none', color: 'black'}} to='/about' >About</Link> {menu==='about'?<hr/>:<></>}</li>
				<li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none', color: 'black'}} to='/shop' >Shop</Link> {menu==='shop'?<hr/>:<></>}</li>
				<li onClick={()=>{setMenu('contact')}}><Link style={{textDecoration: 'none', color: 'black'}} to='/contact' >Contact</Link> {menu==='contact'?<hr/>:<></>}</li>
			</ul>
			<div className="nav-login-cart">
				<Link to='/login'><button>Login</button></Link>
				<Link to='/cart'><img src={cart_icon} alt="cart-icon" /></Link>
				<div className="nav-cart-count">{getTotalCartItems()}</div>
			</div>
		</nav>
	)
};

export default Navbar;
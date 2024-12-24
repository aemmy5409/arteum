import './Footer.css';
import logo from '../../assets/arteum.png';
import instagram_icon from '../../assets/instagram.png';
import x_icon from '../../assets/x_twitter.png';
import facebook_icon from '../../assets/facebook.png';

const Footer = () => {
	return (
		<div className='footer'>
			<div className="footer-logo">
				<img src={logo} alt="arteum-logo" />
			</div>
			<ul className="footer-links">
				<li>Home</li>
				<li>About</li>
				<li>Shop</li>
				<li>Contact</li>
			</ul>
			<div className="footer-social-icon">
				<div className="footer-icons-container">
					<img src={instagram_icon} alt="instagram-icon" />
				</div>
				<div className="footer-icons-container">
					<img src={x_icon} alt="twitter-icon" />
				</div>
				<div className="footer-icons-container">
					<img src={facebook_icon} alt="facebook-icon" />
				</div>
			</div>
			<div className="footer-copyright">
				<hr />
				<p>Copyright &copy; {new Date().getFullYear()} Arteum</p>
			</div>
		</div>
	)
}

export default Footer
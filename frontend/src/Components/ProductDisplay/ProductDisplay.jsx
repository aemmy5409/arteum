import { useContext } from 'react'

import './ProductDisplay.css'
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
	const {product} = props;
	const {addToCart} = useContext(ShopContext);
  return (
	<div className='productdisplay'>
		<div className="productdisplay-left">
			<div className="productdisplay-img">
				<img className='productdisplay-main-img' src={product.image} alt="" />
			</div>
		</div>
		<div className="productdisplay-right">
			<h1>{product.name}</h1>
			<div className="productdisplay-right-star">
				<img src={star_icon} alt="" />
				<img src={star_icon} alt="" />
				<img src={star_icon} alt="" />
				<img src={star_icon} alt="" />
				<img src={star_dull_icon} alt="" />
				<p>(300)</p>
			</div>
			<div className="productdisplay-right-prices">
				<div className="productdiplay-right-price">${product.price}</div>
			</div>
			<div className="productdisplay-right-description">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				Laboriosam ratione nisi maxime, obcaecati debitis enim 
				ducimus beatae reprehenderit ab quis?
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</div>
			<button onClick={() => {addToCart(product.id)}}>add to cart</button>
		</div>
	</div>
  )
}

export default ProductDisplay

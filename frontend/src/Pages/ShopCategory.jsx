import { useContext } from "react"
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from "../Components/Items/Item"

import './CSS/ShopCategory.css'
import { ShopContext } from "../Context/ShopContext"

const ShopCategory = () => {
	const {Data} = useContext(ShopContext)
	return (
		<div className="shop-category">
			<div className="shopcategory-indexSort">
				<p>
					<span>Showing 1-12</span> out of 36 products
				</p>
				<div className="shopcategory-sort">
					Sort by <img src={dropdown_icon} alt=""/>
				</div>
			</div>
			<div className="shopcategory-products">
					{Data.map((item, i) => {
						return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
					})}
			</div>
			<div className="shopcategory-loadmore">
				Explore More
			</div>
		</div>
	)
}

export default ShopCategory
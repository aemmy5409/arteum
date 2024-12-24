import './Featured.css';
import data_product from '../../assets/mockData'
import Item from '../Items/Item';

const Featured = () => {
	return (
		<div className="featured">
			<h1>Featured Products</h1>
			<hr />
			<div className="featured-item">
				{data_product.map((item, i) => {
					return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
				})}
			</div>
		</div>
	)
}

export default Featured
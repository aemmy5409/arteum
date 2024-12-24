import './RelatedProducts.css'
import data from '../../assets/mockData'
import Item from '../Items/Item'

const RelatedProducts = () => {
  return (
	<div className='relatedproducts'>
		<h1>Related Products</h1>
		<hr />
		<div className="relatedproducts-item">
			{data.map((item, i) => {
				return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
			})}
		</div>
	</div>
  )
}

export default RelatedProducts
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Item.css';

const Item = (props) => {
	return (
		<div className="item-wrapper">
			<div className="item">
				<Link to={`/products/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /></Link>
				<p>{props.name}</p>
				<div className="item-prices">
					<div className="current-price">
						${props.price}
					</div>
				</div>
			</div>
		</div>
		
	)
}

Item.propTypes = {
	name: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	id: PropTypes.number
}

export default Item
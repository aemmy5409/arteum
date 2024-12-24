import { createContext, useState } from 'react';
import Data from '../assets/collections';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
	let cart = {};
	for (let index = 0; index < Data.length+1; index++) {
		cart[index]  = 0;
	}
	return cart;
}

const ShopContextProvider = (props) => {
	
	const [cartItems, setCartItems] = useState(getDefaultCart());

	const addToCart = (itemId) => {
		setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })
	) }

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
	}

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for(const item in cartItems) {
			if(cartItems[item] > 0) {
				let itemInfo = Data.find((product) => product.id === Number(item))
				totalAmount += itemInfo.price * cartItems[item];
			}
		}
		return totalAmount
	}

	const getTotalCartItems = () => {
		let totalItem = 0;
		for(const item in cartItems) {
			if(cartItems[item] > 0) {
				totalItem += cartItems[item]
			}
		}
		return totalItem;
	}

	const contextValue = {Data, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	)
}

export default ShopContextProvider;
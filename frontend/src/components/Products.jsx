import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from "../state/product/productActions";
import Loading from "./Loading";

const Products = () => {
	const dispatch = useDispatch();
	const {
		products = [],
		loading,
		error,
		_,
	} = useSelector((state) => state.productList);
	useEffect(() => {
		dispatch(productListAction());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<Loading></Loading>
			) : error ? (
				<h1>error</h1>
			) : (
				<section className="text-gray-600 body-font">
					<div className="container px-5 py-5 mx-auto">
						<div className="flex flex-wrap -m-4">
							{products.map((product) => (
								<div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
									<div className="bg-white">
										<div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
											<div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
												<div className="group relative">
													<img
														src={product.image}
														alt="Front of men&#039;s Basic Tee in black."
														className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
													/>
													<div className="mt-4 flex justify-between">
														<div>
															<h3 className="text-sm text-gray-700">
																<Link to={`/products/${product._id}`}>
																	<span
																		aria-hidden="true"
																		className="absolute inset-0"
																	></span>
																	{product.name}
																</Link>
															</h3>
															<p className="mt-1 text-sm text-gray-500">
																{product.artist}
															</p>
														</div>
														<p className="text-sm font-medium text-gray-900">
															${product.price}
														</p>{" "}
													</div>{" "}
												</div>{" "}
											</div>{" "}
										</div>{" "}
									</div>{" "}
								</div>
							))}
						</div>
					</div>
				</section>
			)}
		</div>
		// <>
		// 	<section className="text-gray-600 body-font">
		// 		<div className="container px-5 py-24 mx-auto">
		// 			<div className="flex flex-wrap -m-4">
		// 				<div className="p-4 lg:w-1/4 md:w-1/2">
		// 					<div className="bg-white">
		// 						<div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		// 							<div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		// 								<div className="group relative">
		// 									<img
		// 										src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
		// 										alt="Front of men&#039;s Basic Tee in black."
		// 										className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
		// 									/>
		// 									<div className="mt-4 flex justify-between">
		// 										<div>
		// 											<h3 className="text-sm text-gray-700">
		// 												<a href="#">
		// 													<span
		// 														aria-hidden="true"
		// 														className="absolute inset-0"
		// 													></span>
		// 													Basic Tee
		// 												</a>
		// 											</h3>
		// 											<p className="mt-1 text-sm text-gray-500">Black</p>
		// 										</div>
		// 										<p className="text-sm font-medium text-gray-900">$35</p>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-4 lg:w-1/4 md:w-1/2">
		// 					<div className="bg-white">
		// 						<div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		// 							<div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		// 								<div className="group relative">
		// 									<img
		// 										src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
		// 										alt="Front of men&#039;s Basic Tee in black."
		// 										className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
		// 									/>
		// 									<div className="mt-4 flex justify-between">
		// 										<div>
		// 											<h3 className="text-sm text-gray-700">
		// 												<a href="#">
		// 													<span
		// 														aria-hidden="true"
		// 														className="absolute inset-0"
		// 													></span>
		// 													Basic Tee
		// 												</a>
		// 											</h3>
		// 											<p className="mt-1 text-sm text-gray-500">Black</p>
		// 										</div>
		// 										<p className="text-sm font-medium text-gray-900">$35</p>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-4 lg:w-1/4 md:w-1/2">
		// 					<div className="bg-white">
		// 						<div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		// 							<div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		// 								<div className="group relative">
		// 									<img
		// 										src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
		// 										alt="Front of men&#039;s Basic Tee in black."
		// 										className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
		// 									/>
		// 									<div className="mt-4 flex justify-between">
		// 										<div>
		// 											<h3 className="text-sm text-gray-700">
		// 												<a href="#">
		// 													<span
		// 														aria-hidden="true"
		// 														className="absolute inset-0"
		// 													></span>
		// 													Basic Tee
		// 												</a>
		// 											</h3>
		// 											<p className="mt-1 text-sm text-gray-500">Black</p>
		// 										</div>
		// 										<p className="text-sm font-medium text-gray-900">$35</p>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-4 lg:w-1/4 md:w-1/2">
		// 					<div className="bg-white">
		// 						<div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		// 							<div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
		// 								<div className="group relative">
		// 									<img
		// 										src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
		// 										alt="Front of men&#039;s Basic Tee in black."
		// 										className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
		// 									/>
		// 									<div className="mt-4 flex justify-between">
		// 										<div>
		// 											<h3 className="text-sm text-gray-700">
		// 												<a href="#">
		// 													<span
		// 														aria-hidden="true"
		// 														className="absolute inset-0"
		// 													></span>
		// 													Basic Tee
		// 												</a>
		// 											</h3>
		// 											<p className="mt-1 text-sm text-gray-500">Black</p>
		// 										</div>
		// 										<p className="text-sm font-medium text-gray-900">$35</p>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>
		// </>
	);
};

export default Products;

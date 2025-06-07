import { useState, useEffect, useRef } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	PopoverGroup,
} from "@headlessui/react";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../state/user/authActions";
import Checkout from "../pages/Checkout";

const navigation = {
	pages: [
		{ name: "Home", href: "/" },
		{ name: "About", href: "#" },
		{ name: "Contact", href: "#" },
	],
};

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const searchRef = useRef(null);

	const dispatch = useDispatch();

	const qty = useSelector((state) =>
		state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
	);

	const { userInfo } = useSelector((state) => state.authReducer);
	const logoutHandler = async () => {
		try {
			await dispatch(userLogout());
			location.reload();
		} catch (err) {
			console.log("Logout Error: ", err);
		}
	};

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowSearch(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="bg-white">
			{/* Mobile menu */}
			<Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
				/>

				<div className="fixed inset-0 z-40 flex">
					<DialogPanel
						transition
						className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
					>
						<div className="flex px-4 pt-5 pb-2">
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>

						<div className="space-y-6 border-t border-gray-200 px-4 py-6">
							{navigation.pages.map((page) => (
								<div key={page.name} className="flow-root">
									<Link
										to={page.href}
										className="-m-2 block p-2 font-medium text-gray-900"
									>
										{page.name}
									</Link>
								</div>
							))}
						</div>

						<div className="space-y-6 border-t border-gray-200 px-4 py-6 mt-auto">
							{userInfo ? (
								<div className="flow-root">
									<button
										className="-m-2 block p-2 font-medium text-gray-900"
										onClick={logoutHandler}
									>
										Logout
									</button>
								</div>
							) : (
								<>
									<div className="flow-root">
										<Link
											to="/login"
											className="-m-2 block p-2 font-medium text-gray-900"
										>
											Sign in
										</Link>
									</div>
									<div className="flow-root">
										<Link
											to="/register"
											className="-m-2 block p-2 font-medium text-gray-900"
										>
											Create account
										</Link>
									</div>
								</>
							)}
						</div>

						<div className="border-t border-gray-200 px-4 py-6">
							<a href="#" className="-m-2 flex items-center p-2">
								<img
									alt=""
									src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
									className="block h-auto w-5 shrink-0"
								/>
								<span className="ml-3 block text-base font-medium text-gray-900">
									CAD
								</span>
								<span className="sr-only">, change currency</span>
							</a>
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			<header className="relative bg-white">
				<p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
					Get free delivery on orders over $100
				</p>

				<nav
					aria-label="Top"
					className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							<button
								type="button"
								onClick={() => setOpen(true)}
								className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open menu</span>
								<Bars3Icon aria-hidden="true" className="size-6" />
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<a href="#">
									<span className="sr-only">Your Company</span>
									<img alt="" src="/arteum-black.png" className="h-8 w-auto" />
								</a>
							</div>

							{/* Flyout menus */}
							<PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{navigation.pages.map((page) => (
										<Link
											key={page.name}
											to={page.href}
											className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:underline"
										>
											{page.name}
										</Link>
									))}
								</div>
							</PopoverGroup>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{userInfo ? (
										<>
											<button
												href="#"
												className="text-sm font-medium text-gray-700 hover:text-gray-800"
												onClick={logoutHandler}
											>
												Logout
											</button>
											<span
												aria-hidden="true"
												className="h-6 w-px bg-gray-200"
											/>
										</>
									) : (
										<>
											<Link
												to="/login"
												className="text-sm font-medium text-gray-700 hover:text-gray-800"
											>
												Sign in
											</Link>
											<span
												aria-hidden="true"
												className="h-6 w-px bg-gray-200"
											/>
											<Link
												to="/register"
												className="text-sm font-medium text-gray-700 hover:text-gray-800"
											>
												Create account
											</Link>
										</>
									)}
								</div>

								<div className="hidden lg:ml-8 lg:flex">
									<a
										href="#"
										className="flex items-center text-gray-700 hover:text-gray-800"
									>
										<img
											alt=""
											src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
											className="block h-auto w-5 shrink-0"
										/>
										<span className="ml-3 block text-sm font-medium">CAD</span>
										<span className="sr-only">, change currency</span>
									</a>
								</div>

								{/* Search */}
								<div className="flex lg:ml-6 relative" ref={searchRef}>
									<button
										type="button"
										onClick={() => setShowSearch((prev) => !prev)}
										className="p-2 text-gray-400 hover:text-gray-500"
									>
										<span className="sr-only">Search</span>
										<MagnifyingGlassIcon
											aria-hidden="true"
											className="size-6"
										/>
									</button>

									{showSearch && (
										<form className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-48 sm:w-64 z-50">
											<input
												type="text"
												autoFocus
												placeholder="Search..."
												className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
											/>
										</form>
									)}
								</div>

								{/* Cart */}
								<div className="ml-4 flow-root lg:ml-6">
									<button
										onClick={() => setCartOpen(true)}
										className="group -m-2 flex items-center p-2"
									>
										<ShoppingBagIcon
											aria-hidden="true"
											className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
										/>
										<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
											{qty}
										</span>
										<span className="sr-only">items in cart, view bag</span>
									</button>
								</div>
								<Checkout
									cartOpen={cartOpen}
									setCartOpen={setCartOpen}
								></Checkout>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { userLogout } from "../state/user/authActions";
// import Checkout from "../pages/Checkout";

// const Navbar = () => {
// 	// State to toggle the mobile menu
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [cartOpen, setCartOpen] = useState(false);

// 	// Function to toggle the mobile menu
// 	const toggleMenu = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	const dispatch = useDispatch();

// 	const qty = useSelector((state) =>
// 		state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
// 	);

// 	const { userInfo } = useSelector((state) => state.authReducer);
// 	const logoutHandler = async () => {
// 		try {
// 			await dispatch(userLogout());
// 			location.reload();
// 		} catch (err) {
// 			console.log("Logout Error: ", err);
// 		}
// 	};

// 	return (
// 		<>
// 			<nav className="bg-white border-gray-200 dark:bg-gray-900">
// 				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
// 					<a
// 						href="https://flowbite.com/"
// 						className="flex items-center space-x-3 rtl:space-x-reverse"
// 					>
// 						<img
// 							src="https://flowbite.com/docs/images/logo.svg"
// 							className="h-8"
// 							alt="Flowbite Logo"
// 						/>
// 						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
// 							Flowbite
// 						</span>
// 					</a>
// 					<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
// 						{userInfo ? (
// 							<>
// 								<button
// 									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
// 									onClick={logoutHandler}
// 								>
// 									Logout
// 								</button>
// 								<button
// 									data-collapse-toggle="navbar-cta"
// 									type="button"
// 									class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// 									aria-controls="navbar-cta"
// 									aria-expanded="false"
// 									onClick={() => setCartOpen(true)}
// 								>
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										fill="none"
// 										viewBox="0 0 24 24"
// 										strokeWidth={1.5}
// 										stroke="currentColor"
// 										className="size-6"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
// 										/>
// 									</svg>
// 									<span>{qty}</span>
// 								</button>

// 								<Checkout
// 									cartOpen={cartOpen}
// 									setCartOpen={setCartOpen}
// 								></Checkout>
// 							</>
// 						) : (
// 							<>
// 								<Link
// 									to="/login"
// 									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
// 								>
// 									Get Started
// 								</Link>
// 								<button
// 									data-collapse-toggle="navbar-cta"
// 									type="button"
// 									class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// 									aria-controls="navbar-cta"
// 									aria-expanded="false"
// 									onClick={() => setCartOpen(true)}
// 								>
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										fill="none"
// 										viewBox="0 0 24 24"
// 										strokeWidth={1.5}
// 										stroke="currentColor"
// 										className="size-6"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
// 										/>
// 									</svg>
// 									<span>{qty}</span>
// 								</button>

// 								<Checkout
// 									cartOpen={cartOpen}
// 									setCartOpen={setCartOpen}
// 								></Checkout>
// 							</>
// 						)}
// 						<button
// 							onClick={toggleMenu} // Added toggle functionality here
// 							type="button"
// 							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// 							aria-controls="navbar-cta"
// 							aria-expanded={isOpen ? "true" : "false"}
// 						>
// 							<span className="sr-only">Open main menu</span>
// 							<svg
// 								className="w-5 h-5"
// 								aria-hidden="true"
// 								xmlns="http://www.w3.org/2000/svg"
// 								fill="none"
// 								viewBox="0 0 17 14"
// 							>
// 								<path
// 									stroke="currentColor"
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth="2"
// 									d="M1 1h15M1 7h15M1 13h15"
// 								/>
// 							</svg>
// 						</button>
// 					</div>
// 					<div
// 						className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
// 							isOpen ? "block" : "hidden"
// 						}`} // Toggle visibility based on state
// 						id="navbar-cta"
// 					>
// 						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
// 							<li>
// 								<a
// 									href="#"
// 									className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
// 									aria-current="page"
// 								>
// 									Home
// 								</a>
// 							</li>
// 							<li>
// 								<a
// 									href="#"
// 									className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
// 								>
// 									About
// 								</a>
// 							</li>
// 							<li>
// 								<a
// 									href="#"
// 									className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
// 								>
// 									Services
// 								</a>
// 							</li>
// 							<li>
// 								<a
// 									href="#"
// 									className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
// 								>
// 									Contact
// 								</a>
// 							</li>
// 						</ul>
// 					</div>
// 				</div>
// 			</nav>
// 		</>
// 	);
// };

// export default Navbar;

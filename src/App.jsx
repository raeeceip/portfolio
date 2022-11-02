import React, { useState, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Components/Layout/AppRoutes";
import Loader from "./Components/Loader/Loader";
import "./index.css";

function App() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 2000);
	}, []);

	return (
		/* add loading screen */

		<div className="App ">
			{loading ? (
				<Loader />
			) : (
				<BrowserRouter>
					<Header />
					<div className="flex items-center  justify-center ">
						<AppRoutes />
					</div>
					<Footer />
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;

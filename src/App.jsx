import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Body from "./Components/Pages/body/body";
import Footer from "./Components/Footer/Footer";
import About from "./Components/Pages/body/about";
import NotFound from "./Components/NotFound/NotFound";
import AppRoutes from "./Components/Layout/AppRoutes";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<div>
					<AppRoutes />
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

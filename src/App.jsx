import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Components/Layout/AppRoutes";
import "./index.css";

function App() {
	return (
		<div className="App ">
			<BrowserRouter>
				<Header />
				<div className="flex items-center  justify-center ">
					<AppRoutes />
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

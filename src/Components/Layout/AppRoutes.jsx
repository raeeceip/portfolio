import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Body from "../Pages/body/body";
import About from "../Pages/body/about";
import NotFound from "../NotFound/NotFound";

const AppRoutes = () => {
	return (
		<AnimatePresence mode="wait">
			<Routes>
				<Route path="/" element={<Body />} />
				<Route path="/projects" element={<About />} />
				<Route path="/contact" element={<Body />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
};
export default AppRoutes;

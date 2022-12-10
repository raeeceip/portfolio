import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Body from "../Pages/body/body";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Components/NotFound/NotFound";
import Projects from "../Pages/Projects/Projects";
import About from "../Pages/body/about";
import { AnimatePresence } from "framer-motion";

const AppRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Body />} />
				<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
};
export default AppRoutes;

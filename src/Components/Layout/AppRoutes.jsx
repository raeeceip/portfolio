import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Body from "../Pages/body/body";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../NotFound/NotFound";
import Projects from "../Pages/Projects/Projects";
import About from "../Pages/body/about";

const AppRoutes = () => {
	return (
		<AnimatePresence mode="wait">
			<Routes>
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

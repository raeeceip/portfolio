import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Body from "../Pages/body/body";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../NotFound/NotFound";
import Projects from "../Pages/Projects/Projects";

const AppRoutes = () => {
	return (
		<AnimatePresence mode="wait">
			<Routes>
				<Route path="/" element={<Body />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
};
export default AppRoutes;

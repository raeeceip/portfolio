import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-9xl font-bold">404</h1>
			<h2 className="text-6xl font-bold mb-14">Page Not Found</h2>
			<Link
				to="/"
				className="px-6 py-3 bg-green-600 rounded-full text-3xl hover:bg-yellow-300 transition duration-300 ease-in-out flex items-center animate-bounce"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;

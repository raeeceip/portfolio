import React, { useState, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Layout/AppRoutes";
import Loader from "./Components/Loader/Loader";
import VivusLoader from "./Components/Loader/VivusLoader";
import { Helmet } from "react-helmet";
import "./index.css";

function App({ title, desc }) {
	if (!title) title = "Chiso";
	if (!desc) desc = "Chiso - Softwar Developer";
	let keywords =
		"Chiso, Chibogu, Software Developer, PHP, Javascript, Python, Azure, Docker";
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => setLoading(false), 3000);
	}, []);

	return (
		/* add loading screen */

		<div className="App">
			<Helmet>
				<title>{title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content="#171717" />
				<meta name="description" content={desc} />
				<meta name="keywords" content={keywords} />
				<link rel="icon" type="image/x-icon" href="/images/preview.jpg" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://www.chiso.tech" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={desc} />
				<meta property="og:image" content="/images/preview.jpg" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="http://www.chiso.tech" />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={desc} />
				<meta property="twitter:image" content="/images/preview.jpg" />

				<meta property="og:site_name" content="" />
				<meta property="og:site" content="" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={desc} />
				<meta property="og:image" content="/images/preview.jpg" />
				<meta property="og:url" content="http://www.chiso.tech" />
			</Helmet>
			{loading ? (
				<Loader />
			) : (
				<BrowserRouter>
					<Header />
					<div className="flex items-center  justify-center ">
						<AppRoutes />
					</div>
					<Footer
						githubLink="https://github.com/raeeceip"
						linkedinLink="https://linkedin.com/in/raeeceip"
					/>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;

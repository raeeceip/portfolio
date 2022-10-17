import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

// add routes for pages

const Header = () => {
	return (
		<nav className="relative flex w-100 bg-black p-6 text-white justify-between">
			<h1 className="ml-0">Chiso</h1>
			<ul className="flex justify-evenly mr-0">
				<li className="mr-5 hover:bg-white ">
					<Link to="/" className="header__nav-link">
						Home
					</Link>
				</li>
				<li className="mr-5">
					<Link to="/projects" className="header__nav-link">
						About
					</Link>
				</li>
				<li className="mr-0">
					<Link to="/contact" className="header__nav-link">
						Contact
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Header;

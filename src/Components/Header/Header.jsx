import { React, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

// add routes for pages

const Header = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	return (
		<div className="flex mx-2 items-center justify-between border-b border-gray-400 py-8">
			<Link to="/">
				<h1 className="text-3xl font-bold">Chiso</h1>
			</Link>
			<nav>
				<section className="MOBILE-MENU flex lg:hidden">
					<div
						className="HAMBURGER-ICON space-y-2"
						onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
					>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
					</div>

					<div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
						{" "}
						<div
							className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
							onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
						>
							<svg
								className="h-8 w-8 text-gray-600"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</div>
						<ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/">About</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/projects">Portfolio</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/contact">Contact</Link>
							</li>
						</ul>
					</div>
				</section>

				<ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/projects">Portfolio</Link>
					</li>
					<li>
						<Link to="/Contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;

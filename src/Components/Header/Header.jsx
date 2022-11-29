import { React, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPerson } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

// add routes for pages

const Header = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	return (
		<div className="flex mx-2 items-center justify-between border-b border-gray-400 py-5">
			<Link to="/">
				<h1 className="font-Quentin text-4xl">Chiso</h1>
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
							onClick={() => setIsNavOpen(false)}
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
								<Link to="/" onClick={() => setIsNavOpen(false)}>
									Home
								</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/about" onClick={() => setIsNavOpen(false)}>
									About
								</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/projects" onClick={() => setIsNavOpen(false)}>
									Portfolio
								</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase">
								<Link to="/contact" onClick={() => setIsNavOpen(false)}>
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</section>

				<ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
					<motion.div whileHover={{ rotate: 15 }}>
						<li>
							<Link to="/about">
								<FontAwesomeIcon icon={faPerson} /> About
							</Link>
						</li>
					</motion.div>

					<li>
						<Link to="/projects">
							<div>
								<FontAwesomeIcon icon={faBriefcase} />
								Portfolio
							</div>
						</Link>
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

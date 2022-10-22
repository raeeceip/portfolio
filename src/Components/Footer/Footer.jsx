import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<div className="absolute flex w-full top-[90vh]  bottom-0  p-6 text-white justify-evenly">
			<h1 className="ml-0">Chiso</h1>
			<ul className="flex justify-between">
				<li className="mx-2">
					<a href="#" className="header__nav-link">
						Contact
					</a>
				</li>
				<li className="mx-2 text-3xl">
					<a href="#" className="header__nav-link">
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</li>
				<li className="mx-2 text-3xl">
					<a href="#" className="header__nav-link">
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
	return (
		<div className="absolute flex w-full top-[89vh]  bottom-0  p-6 text-white justify-evenly">
			<h1 className="ml-0 text-2xl">Chiso</h1>
			<ul className="flex justify-between">
				<li className="mx-2 text-2xl">
					<a href="#" className="header__nav-link">
						<FontAwesomeIcon icon={faPhone} className="text-white" />
					</a>
				</li>
				<li className="mx-2 text-2xl">
					<a href="https://github.com/raeeceip" className="header__nav-link">
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</li>
				<li className="mx-2 text-2xl">
					<a href="#" className="header__nav-link">
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;

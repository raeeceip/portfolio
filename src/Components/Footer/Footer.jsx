import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ githubLink, linkedinLink }) => {
	return (
		<footer className="absolute w-full top-92vh bottom-0 text-white justify-evenly">
			<h1 className="font-Quentin ml-0 text-2xl text-center">Chiso™</h1>
			<nav style={{ listStyle: "none" }} className="flex justify-between">
				<li className="mx-2 text-2xl">
					<a href="#" className="header__nav-link" aria-label="Phone">
						<FontAwesomeIcon
							icon={faPhone}
							className="text-white"
							alt="Phone icon"
						/>
					</a>
				</li>
				<li className="mx-2 text-2xl">
					<a
						href={githubLink}
						className="header__nav-link"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<FontAwesomeIcon icon={faGithub} alt="GitHub icon" />
					</a>
				</li>
				<li className="mx-2 text-2xl">
					<a
						href={linkedinLink}
						className="header__nav-link"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<FontAwesomeIcon icon={faLinkedin} alt="LinkedIn icon" />
					</a>
				</li>
			</nav>
		</footer>
	);
};

export default Footer;

import React from "react";
import {
	faPython,
	faReact,
	faNodeJs,
	faJava,
	faHtml5,
	faCss3,
	faJs,
	faGit,
	faDocker,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const transition = { duration: 0.9, ease: "easeInOut" };

const Variants = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition },
	exit: { opacity: 0, transition },
};

const About = () => {
	return (
		<motion.div
			className="relative mt-5 mx-5 flex text-center space-between justify-center overflow-y-scroll "
			initial="exit"
			animate="enter"
			exit="exit"
			variants={Variants}
		>
			<div className="sm:w-1/2 h-1/2">
				<h1 className="text-4xl">About</h1>
				<p className="text-2xl">
					I am a software developer with a passion for building software that
					solves real world problems. I am a problem solver, a team player and a
					fast learner. I love to learn new things and I am always open to
					learning new technologies.
				</p>
				<h2 className="mt-5 border-b text-2xl text-center"> Skills </h2>
				<p className="text-2xl">
					I'm skilled with using the following to create amazing projects
				</p>
				<ul className="flex justify-evenly">
					<li>
						<FontAwesomeIcon icon={faHtml5} />{" "}
					</li>
					<li>
						<FontAwesomeIcon icon={faCss3} />{" "}
					</li>
					<li>
						<FontAwesomeIcon icon={faJs} />{" "}
					</li>
					<li>
						<FontAwesomeIcon icon={faReact} />{" "}
					</li>
					<li>
						<FontAwesomeIcon icon={faNodeJs} />
					</li>
					<li>Django</li>
					<li>
						<FontAwesomeIcon icon={faPython} />
					</li>
					<li>
						<FontAwesomeIcon icon={faFlask} />
					</li>
					<li>
						<FontAwesomeIcon icon={faGit} />
					</li>
					<li>
						<FontAwesomeIcon icon={faDocker} />
					</li>
				</ul>
				<p className="text-2xl"> I'm also familiar with the following tools</p>
				<ul className="flex justify-evenly">
					<li>Express</li>
					<li>Heroku</li>
					<li>Netlify</li>
					<li>Git</li>
				</ul>
			</div>
		</motion.div>
	);
};

export default About;

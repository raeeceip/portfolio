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
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";

const About = () => {
	return (
		<div>
			<div className="relative h-[95vh] flex text-center space-between justify-center ">
				<div className="sm:w-1/2">
					<h1 className="text-4xl">About</h1>
					<p className="text-2xl">
						I am a software developer with a passion for building software that
						solves real world problems. I am a problem solver, a team player and
						a fast learner. I love to learn new things and I am always open to
						learning new technologies.
					</p>
					<h2 className="border-b text-2xl text-center"> Skills </h2>
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
					</ul>
					<p className="text-2xl">
						{" "}
						I'm also familiar with the following tools
					</p>
					<ul className="flex justify-evenly">
						<li>Express</li>
						<li>Heroku</li>
						<li>Netlify</li>
						<li>Git</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default About;

import { motion } from "framer-motion";
import {
	faDiscord,
	faGithub,
	faLinkedin,
	faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import { faChain, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Projects = () => {
	return (
		<div className="projects  relative fade-left h-[80vh] top-2 bottom-4 mx-3 overflow-y-scroll ">
			<div className="flex glass-bg bg-transparent flex-col justify-center text-center ">
				<h1 className="text-4xl uppercase font-bold">Projects</h1>
			</div>
			<div className="uppercase sm:flex md:grid grid-cols-3 flex-col mx-3 gap-3 ">
				<motion.div
					className="card bg-transparent rounded shadow-lg inline justify-center text-left items-center m-2"
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ delay: 0.5, type: "tween" }}
				>
					<p className="text-2xl border-b">
						Btsfy{" "}
						<span className="bg-yellow inline-block rounded px-2 py-1">
							IN PROGRESS
						</span>
					</p>

					<h3 className="text-lg font-semibold">
						A web app that splits csv and json files
					</h3>
					<p className="text-sm font-light">HTML, Tailwind, Django</p>
					<ul className="inline mt-2 justify-evenly ">
						<li>
							<a
								href="https://github.com/raeeceip"
								className="text-sm font-semibold"
							>
								Github
								<FontAwesomeIcon
									icon={faGithub}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
						<li>
							<a
								href="https://btsfy.herokuapp.com"
								className="text-sm font-semibold"
							>
								Website
								<FontAwesomeIcon
									icon={faChain}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
					</ul>
				</motion.div>
				<motion.div
					className="card rounded shadow-lg inline justify-center items-center m-2"
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ delay: 0.4, type: "tween" }}
				>
					<p className="text-2xl border-b">Comic-world</p>

					<h3 className="text-lg font-semibold">
						A webapp for searching for and finding heroes and their comic
						appearances
					</h3>
					<p className="text-sm font-light">React, Tailwind, Marvel API</p>

					<ul className="">
						<li>
							<a
								href="https://github.com/raeeceip"
								className="text-sm font-semibold"
							>
								Github
								<FontAwesomeIcon
									icon={faGithub}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/raeeceip"
								className="text-sm font-semibold"
							>
								Website
								<FontAwesomeIcon
									icon={faChain}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
					</ul>
				</motion.div>
				<motion.div
					className="card rounded shadow-lg inline justify-center items-center m-2"
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ delay: 0.6, type: "tween" }}
				>
					<p className="text-2xl border-b">Comic-world</p>

					<h3 className="text-lg font-semibold">
						A webapp for searching for and finding heroes and their comic
						appearances
					</h3>
					<p className="text-sm font-light">React, Tailwind, Marvel API</p>

					<ul className="">
						<li>
							<a
								href="https://github.com/raeeceip"
								className="text-sm font-semibold"
							>
								Github
								<FontAwesomeIcon
									icon={faGithub}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/raeeceip"
								className="text-sm font-semibold"
							>
								Website
								<FontAwesomeIcon
									icon={faChain}
									className="text-sm font-light ml-2"
								/>
							</a>
						</li>
					</ul>
				</motion.div>
			</div>
		</div>
	);
};

export default Projects;

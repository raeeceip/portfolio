import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Projects = () => {
	return (
		<div className="projects  relative  fade-left h-[98vh]  mx-3 ">
			<div className="flex glass-bg bg-transparent flex-col justify-center text-center">
				<h1 className="text-4xl font-bold">Projects</h1>
				<p className="text-2xl font-bold mb-5">
					Below are some of my most recent projects, published on Github and
					deployed on Hosting platforms
				</p>
			</div>
			<div className="absolute sm:flex md:grid grid-cols-3 h-[50vh] sm:h-[60vh] flex-col mx-5 gap-2 overflow-y-scroll sm:overflow-hidden ">
				<div className="card bg-transparent rounded shadow-lg flex flex-col justify-center text-left items-center m-5">
					<p className="text-2xl border-b">Btsfy - WIP</p>

					<h3> A web app that splits csv and json files</h3>
					<p>HTML, Tailwind, Django</p>
					<a href="https://btsfy.herokuapp.com">View</a>
				</div>
				<div className="card rounded shadow-lg   flex flex-col justify-center text-left items-center m-5">
					<p className="text-2xl border-b">Comic-world</p>
					<div clasName="text-right text-sm">
						<h3>
							A webapp for searching for and finding heroes and their comic
							appeareanes
						</h3>
						<p>React, Tailwind, Marvel API</p>
					</div>

					<ul className="">
						<li>
							<a href="https://github.com/raeeceip">
								Github
								<FontAwesomeIcon icon={faGithub} />
							</a>
						</li>
						<li>
							<a href="https://github.com/raeeceip">
								Website
								<FontAwesomeIcon icon={faChain} />
							</a>
						</li>
					</ul>
				</div>
				<div className="card rounded shadow-lg flex flex-col justify-center text-left items-center m-3">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card rounded shadow-lg   flex flex-col justify-center text-left items-center m-3">
					<p>Django-Netflix</p>
					<h3>
						{" "}
						A netflix clone built with django, with working upload and
						authentication backend
					</h3>
					<p>HTML5,Tailwind, Django</p>
					<ul className="">
						<li>
							<a href="https://github.com/raeeceip">
								Github
								<FontAwesomeIcon icon={faGithub} />
							</a>
						</li>
						<li>
							<a href="https://github.com/raeeceip">
								Website
								<FontAwesomeIcon icon={faChain} />
							</a>
						</li>
					</ul>
				</div>
				<div className="card rounded shadow-lg flex flex-col justify-center text-left items-center m-5">
					<p>And More!</p>
					<h3> Check out my Github Profile for more</h3>
					<ul className="flex justify-evenly">
						<li>
							<a href="https://github.com/raeeceip">
								<FontAwesomeIcon icon={faGithub} />
							</a>
						</li>
						<li>
							<a href="https://github.com/raeeceip">
								<FontAwesomeIcon icon={faLinkedin} />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
export default Projects;

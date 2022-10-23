import React from "react";

const About = () => {
	return (
		<div>
			<div className="relative h-[85vh] flex text-center space-between justify-center mx-10 ">
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
						<li>HTML</li>
						<li>CSS</li>
						<li>JavaScript</li>
						<li>React</li>
						<li>Node</li>
						<li>Django</li>
						<li>Python</li>
						<li>SQL</li>
						<li>Git</li>
					</ul>
					<p className="text-2xl">
						{" "}
						I'm also familiar with the following tools
					</p>
					<ul className="flex justify-evenly">
						<li>Vercel</li>
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

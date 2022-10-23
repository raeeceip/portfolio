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
			<div className="absolute sm:flex md:grid grid-cols-2 h-[50vh] sm:h-[60vh] flex-col mx-5 gap-2 overflow-y-scroll ">
				<div className="card bg-transparent rounded shadow-lg flex flex-col justify-center text-left items-center m-5">
					<p className="text-2xl border-b">Btsfy - WIP</p>

					<h3> A web app that splits csv and json files</h3>
					<p>HTML, Tailwind, Django</p>
					<a href="https://btsfy.herokuapp.com">View</a>
				</div>
				<div className="card rounded shadow-lg   flex flex-col justify-center text-left items-center m-5">
					<p className="text-2xl border-b">Comic-world</p>
					<h3>
						A React application that allows you to search and any marvel Hero,
						and their respective comic appearances
					</h3>
					<p>React, Tailwind, Marvel API</p>
					<a href="https://comic-world.vercel.app">View</a>
				</div>
				<div className="card rounded shadow-lg flex flex-col justify-center text-left items-center m-5">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card rounded shadow-lg hover:bg-white flex flex-col justify-center text-left items-center m-5">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
			</div>
		</div>
	);
};
export default Projects;

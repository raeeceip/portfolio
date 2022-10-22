import React from "react";

const Projects = () => {
	return (
		<div className="projects fade-left h-[95vh] my-5 mx-3 overflow-y-scroll ">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-4xl font-bold">Projects</h1>
				<p className="text-2xl font-bold mb-5">
					Below are some of my most recent projects, published on Github and
					deployed on Hosting platforms
				</p>
			</div>
			<div className="sm:flex md:grid grid-cols-2 flex-col mx-5 gap-3 ">
				<div className="card bg-transparent rounded shadow-lg flex flex-col justify-center text-left items-center m-5">
					<p className="text-5xl">Btsfy - WIP</p>

					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card rounded shadow-lg   flex flex-col justify-center text-left items-center m-5">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
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

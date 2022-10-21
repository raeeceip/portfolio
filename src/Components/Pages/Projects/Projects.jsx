import React from "react";

const Projects = () => {
	return (
		<div className="">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-4xl font-bold">Projects</h1>
				<p className="text-2xl font-bold mb-5">Here are some of my projects</p>
			</div>
			<div className="sm:flex md:grid h-[75vh] grid-cols-2 flex-col mx-5 gap-3 ">
				<div className="card hover:bg-white flex flex-col justify-center text-left items-center">
					<p className="text-5xl">Btsfy - WIP</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card h-[150px] hover:bg-white flex flex-col justify-center text-left items-center">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card h-[150px] hover:bg-white flex flex-col justify-center text-left items-center">
					<p>Chisom</p>
					<h3> A web app that splits csv and json files</h3>
					<p>React, Tailwind, Django</p>
					<a href="https://btsfy.netlify.app/">View</a>
				</div>
				<div className="card h-[150px] hover:bg-white flex flex-col justify-center text-left items-center">
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

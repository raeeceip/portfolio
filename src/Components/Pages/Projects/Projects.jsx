import React from "react";
// create component to get posts from hashnode

const Projects = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="card flex flex-col justify-center items-center">
				<p>Btsfy</p>
				<h3> A web app that splits csv and json files</h3>
				<p>React, Tailwind, Django</p>
				<a href="https://btsfy.netlify.app/">View</a>
			</div>
			<div className="card flex flex-col justify-center items-center">
				<p>Chisom</p>
				<h3> A web app that splits csv and json files</h3>
				<p>React, Tailwind, Django</p>
				<a href="https://btsfy.netlify.app/">View</a>
			</div>
		</div>
	);
};
export default Projects;

import React from "react";
import { useState } from "react";
import "./body.css";

const Body = () => {
	const [showPage, setShowPage] = useState(false);
	return (
		<div className="relative sm:flex h-[70vh] lg:grid md:grid place-items-center grid-flow-col w-screen  lg:top-2 top-10 overflow-y-hidden">
			<div className=" text-left  justify-center mx-5 mt-10  ">
				<div className="typewriter">
					<h1 className="typewriter text-4xl m-2 text-white font-bold">
						Hello!, I'm Chiso
					</h1>
				</div>

				<p className="text-white m-2 lg:text-xl">
					I'm a fullstack web developer with hands-on experience on building,
					deploying and testing various web applications and software.
				</p>
				<p className="text-white m-2 lg:text-xl">
					{" "}
					Focused on building interactive experiences for exceptional people and
					brands on the web
				</p>
				<p className="text-white m-2 lg:text-xl sm:text-xl">
					Based in Lagos, Nigeria
				</p>
				<p className="text-white  lg:text-xl">
					Available for Contract and Full-Time Jobs
				</p>
				<div className="flex">
					<button className="bg-white text-black p-2 rounded-md m-5">
						<a href="mailto:chiboguchisomu@gmail.com">Lets Talk</a>
					</button>
					<button className="bg-white text-black p-2 rounded-md m-5">
						<a href="/projects">Check out some of my projects</a>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Body;

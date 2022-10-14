import React from "react";
import { useState } from "react";

import About from "./about";

const Body = () => {
	const [showPage, setShowPage] = useState(false);
	return (
		<div className="absolute  sm:flex lg:grid place-items-center grid-flow-col w-screen mt-40 md:mt-24  lg:top-2 ">
			<div className=" text-left justify-center top-60">
				<h1 className="lg:text-5xl sm:text-3xl m-2 text-white font-bold">
					Hi there, I'm Chibogu Chisom
				</h1>
				<p className="text-white m-2 lg:text-xl">
					I'm a fullstack web developer with hands-on experience on building,
					deploying and testing various web applications and software. With
					knowledge of React.js, Django, Tailwind and Bootstrap
				</p>
				<p className="text-white m-2 lg:text-xl">Based in Lagos, Nigeria</p>
				<p className="text-white  lg:text-xl">
					Available for Contract and Full-Time Jobs
				</p>
				<div>
					<button className="bg-white text-black p-2 rounded-md m-5">
						<a href="mailto:chiboguchisomu@gmail.com">Lets Talk</a>
					</button>
				</div>
			</div>

			<div className=" invisible grid-cols-1 lg:visible md:visible my-10 mx-10  w-100  ">
				<img
					className="rounded-full"
					src="https://github.com/raeeceip.png"
					alt="Chiso."
				/>
			</div>
		</div>
	);
};

export default Body;

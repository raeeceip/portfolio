import React from "react";
import { useState } from "react";

import About from "./about";

const Body = () => {
	const [showPage, setShowPage] = useState(false);
	return (
		<div className="relative p-8 w-full bg-green-500 ">
			<div className="grid grid-rows-1   grid-cols-3  ">
				<div className="col-span-2 mx-10">
					<div className="flex flex-col justify-center text-left">
						<h1 className="text-5xl text-white font-bold">
							Hi there, I'm Chibogu Chisom
						</h1>
						<p className="text-white text-xl">
							I'm a fullstack web developer with hands-on experience on
							building, deploying and testing various web applications and
							software
						</p>
						<p className="text-white text-xl">
							With knowledge of React.js, Django, Tailwind and Bootstrap
						</p>
						<p className="text-white text-xl">Based in Lagos, Nigeria</p>
						<p className="text-white text-xl">
							Available for Contract and Full-Time Jobs
						</p>
					</div>
				</div>
				<div className="col-span-1 my-10 mx-10 row-span-2 w-100 lg:row-span-1 ">
					<img
						className="rounded-full"
						src="https://github.com/raeeceip.png"
						alt="Chiso."
					/>
				</div>
			</div>
		</div>
	);
};

export default Body;

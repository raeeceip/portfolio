import React from "react";
import { useState } from "react";
import Posts from "./posts";
import About from "./about";

const Body = () => {
	const [showPage, setShowPage] = useState(false);
	return (
		<div className="w-auto">
			<div className="grid grid-rows-1 grid-cols-3 gap-2 mb-0">
				<div className="col-span-2 my-10 mx-10 text-left">
					<div className="flex my-20  text-xl">
						<h1 className="mr-10">Chibogu Chisomu</h1>
						<button className="bg-black h-7 w-20 text-white rounded">
							Contact
						</button>
					</div>
					<h2 className="text-xl">Web Developer</h2>
				</div>
				<div className="col-span-1 my-10 row-span-2 w-60 lg:row-span-1 ">
					<img
						className=" rounded-full"
						src="https://github.com/raeeceip.png"
						alt="Chiso."
					/>
				</div>
				<div className="col-span-2">
					<div className="flex w-28">
						<button className="bg-black px-3 text-white mr-3 rounded">
							Python
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							MySQL
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							React
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							Tailwind
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							{" "}
							Bootstrap
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							JavaScript
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							Heroku
						</button>
						<button className="bg-black px-3 text-white mr-3 rounded">
							CSS
						</button>
					</div>
					<div className="project_container_bottom_description">
						<div className="remote_button_icon">
							<i className="fas fa-laptop-code"></i>
							<button>Remote</button>
						</div>
						<div className="remote_globe_icon">
							<i className="fas fa-laptop-code"></i>
							<button>
								<a href="https://raeeceip.github.io">raeeceip.github.io</a>
							</button>
						</div>
						<div className="icons_container">
							<span>
								<i className="fab fa-instagram"></i>
							</span>
							<span>
								<i className="fab fa-linkedin"></i>
							</span>
							<span>
								<i className="fab fa-twitter"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="block mt-0">
				<div className="project_showcase_navbar">
					<div>
						<button onClick={() => setShowPage(false)}>About</button>
					</div>
					<div>
						<button onClick={() => setShowPage(true)}>Posts</button>
					</div>
				</div>
				<div className="project_showcase_content">
					{showPage ? <Posts /> : <About />}
				</div>
			</div>
		</div>
	);
};

export default Body;

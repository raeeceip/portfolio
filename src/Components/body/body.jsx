import React from "react";
import { useState } from "react";
import Posts from "./posts";
import About from "./about";

const Body = () => {
	const [showPage, setShowPage] = useState(false);
	return (
		<div className="">
			<div className="grid grid-rows-3 grid-cols-3 gap-2">
				<div className="col-span-2 ">
					<div className="flex m-20">
						<h1 className="mr-10">Chiso.</h1>
						<button className="bg-black h-7 w-20 text-white rounded">
							Follow
						</button>
					</div>
					<div className="mb-0">
						<h2>Web Developer</h2>
					</div>
				</div>
				<div className="col-span-1 rounded-full  mr-0 row-span-2 w-60 lg:row-span-1 ">
					<img
						className="rounded-full"
						src="https://github.com/raeeceip.png"
						alt="Chiso."
					/>
				</div>
				<div className="col-span-2">
					<div className="project_container_bottom_buttons">
						<button>Python</button>
						<button>MySQL</button>
						<button>React</button>
						<button>Tailwind</button>
						<button>Bootstrap</button>
						<button>JavaScript</button>
						<button>Heroku</button>
						<button>CSS</button>
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
			<div className="flexbox">
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

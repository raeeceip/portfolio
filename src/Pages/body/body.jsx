import React from "react";
import { useState } from "react";
import "./body.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faBriefcase } from "@fortawesome/free-solid-svg-icons";

const Body = () => {
	return (
		<div className="relative sm:flex lg:grid md:grid  grid-flow-col w-screen  lg:top-2 overflow-y-hidden">
			<div className="text-center mt-10">
				<div className="typewriter">
					<h1 className="text-4xl m-3 text-white font-bold">
						Hello! I'm Chiso
					</h1>
				</div>
				<div className="text">
					<p className="text-white m-3 lg:text-xl">
						I'm a fullstack web developer with experience in building,
						deploying, and testing web applications and software.
					</p>
					<p className="text-white m-3 lg:text-xl sm:text-3xl">
						{" "}
						I focus on creating interactive experiences for exceptional people
						and brands on the web.
					</p>
					<p className="text-white m-3 lg:text-xl sm:text-xl">
						Available for contract and full-time positions
					</p>
				</div>

				<div className="flex justify-center">
					<button className="bg-grey hover:shadow-white w-50% lg:w-20% shadow-md  ease-in-out duration-500 text-black p-2 rounded-md m-5 transform hover:scale-125">
						<FontAwesomeIcon
							icon={faEnvelopeOpen}
							className="text-white mx-3 hover:spin"
						/>
						<Link to="/contact">
							<p className="text-white">Lets Talk</p>
						</Link>
					</button>
					<button className="bg-grey hover:shadow-white shadow-md hover:scale-1.05 ease-in-out duration-500 text-black p-2 rounded-md m-5 transform hover:scale-125">
						<Link to="/projects">
							<FontAwesomeIcon
								icon={faBriefcase}
								className="text-white hover:spin"
							/>
							<p className="text-white">Check out some of my projects</p>
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Body;

import React from "react";
import { useState } from "react";

const Footer = () => {
	return (
		<div className="absolute flex w-full bottom-0 bg-black p-6 text-white justify-between">
			<h1 className="ml-0">Chiso</h1>
			<ul className="flex justify-evenly mr-0">
				<li className="mr-5 hover:bg-white ">
					<a href="#" className="header__nav-link">
						Home
					</a>
				</li>
				<li className="mr-5">
					<a href="#" className="header__nav-link">
						About
					</a>
				</li>
				<li className="mr-0">
					<a href="#" className="header__nav-link">
						Contact
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;

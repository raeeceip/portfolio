import React, { useState, useEffect } from "react";
import "./Loader.css";
const Loader = () => {
	const [progress, setProgress] = useState(40);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => prevProgress + 2);
		}, 50);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="loading-component">
			<div className="loading-bar" style={{ width: `${progress}%` }}></div>
			<div className="loading-count">{progress}%</div>
		</div>
	);
};

export default Loader;

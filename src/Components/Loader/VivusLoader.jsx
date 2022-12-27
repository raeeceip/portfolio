import React from "react";
import ReactVivus from "react-vivus";
import svg from "./vite.svg";

const VivusLoader = () => {
	return (
		<ReactVivus
			id="foo"
			option={{
				file: svg,
				animTimingFunction: "EASE",
				type: "oneByOne",
				onReady: console.log,
			}}
			style={{ height: "100px", width: "100px" }}
			callback={console.log}
		/>
	);
};

export default VivusLoader;

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ProjectCard from "../../Components/Cards/ProjectCard";
import Loader from "../../Components/Loader/Loader";

const Projects = () => {
	const [projectData, setProjectData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://api.chiso.tech/project")
			.then((response) => response.json())
			.then((data) => {
				setProjectData(data);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<div className="projsects relative w-full lg:grid-flow-row h-[90vh] top-2 bottom-4 mx-3 overflow-y-scroll ">
				<div className="flex glass-bg bg-transparent flex-col justify-center text-center ">
					<h1 className="text-4xl uppercase font-bold">Projects</h1>
				</div>
				<motion.div
					className=""
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ delay: 0.5, type: "tween" }}
				>
					{Object.values(projectData).map((project) => (
						<ProjectCard project={project} />
					))}
				</motion.div>
			</div>
		);
	}
};

export default Projects;

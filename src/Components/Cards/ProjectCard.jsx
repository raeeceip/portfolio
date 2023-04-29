
import React from "react";
import "./Cards.css";
import ProjectLink from "./ProjectLink";


const ProjectCard = ({ project }) => {
	const statusClass =
		project.status === "active"
			? "status-active"
			: project.status === "discontinued"
			? "status-discontinued"
			: project.status === "archived"
			? "status-archived"
			: "status-development";


	return (
		<div className="flex flex-col bg-neutral-900 bg-opacity-30 p-4   transition-all rounded">
			<h2 className="text-3xl font-semibold">{project.name}</h2>
			<p className="text-sm leading-relaxed opacity-50 mt-2">
				{project.description}
			</p>
			<div className="mt-auto">
				<div className={"status " + statusClass}>
					{project.status?.toUpperCase()}
				</div>
			</div>
			<div className="flex flex-row mt-2">
				<ProjectLink project={project} />
			</div>
		</div>
	);
};

export default ProjectCard;

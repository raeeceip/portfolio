import React from "react";

import "./Cards.css";

const ProjectLink = ({ project }) => {
	return (
		<div className="flex flex-row gap-2">
			{project.in_progress ? (
				<a
					href={project.url}
					target="_blank"
					rel="noreferrer"
					className="flex flex-row gap-2 items-center text-sm text-neutral-500 hover:text-neutral-300 transition-all"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 2a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-8a1 1 0 100-2 1 1 0 000 2zm2 0a1 1 0 100-2 1 1 0 000 2zm2 0a1 1 0 100-2 1 1 0 000 2z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Live</span>
				</a>
			) : (
				<a
					href={project.gitub_url ? project.gitub_url : ""}
					target="_blank"
					rel="noreferrer"
					className="flex flex-row gap-2 items-center text-sm text-neutral-500 hover:text-neutral-300 transition-all"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 2a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-8a1 1 0 100-2 1 1 0 000 2zm2 0a1 1 0 100-2 1 1 0 000 2zm2 0a1 1 0 100-2 1 1 0 000 2z"
							clipRule="evenodd"
						/>
					</svg>

					<span>GitHub</span>
				</a>
			)}
		</div>
	);
};

export default ProjectLink;

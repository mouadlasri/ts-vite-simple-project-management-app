import React from "react";

import { Project } from "../../../models/Project";

interface ProjectCardProps {
  project: Project;
}

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

// This syntax is also correct
// const formatDescription = (description: string): string => {
//   return description.substring(0, 60) + "...";
// };

export const ProjectsListCard = ({ project }: ProjectCardProps) => {
  const handleEditClick = (projectBeingEdited: Project) => {
    console.log(projectBeingEdited);
  };

  return (
    <div key={project.id} className="cols-sm">
      <div className="card">
        <img src={project.imageUrl} alt="project name" />
        <section className="section dark">
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{project.description}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
          <button
            className="bordered"
            onClick={() => {
              handleEditClick(project);
            }}
          >
            <span className="icon-edit"></span>
            Edit
          </button>
        </section>
      </div>
    </div>
  );
};

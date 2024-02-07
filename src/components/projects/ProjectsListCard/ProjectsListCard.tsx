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
  return (
    <div className="cols-sm">
      <div className="card">
        <img src={project.imageUrl} alt="project name" />
        <section className="section dark">
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{project.description}</p>
          <p>Budget: {project.budget}</p>
        </section>
      </div>
    </div>
  );
};

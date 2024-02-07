import React from "react";

import "./ProjectsList.css";

import { Project } from "../../../models/Project";
import { ProjectsListCard } from "../ProjectsListCard";
import { ProjectForm } from "../ProjectForm";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  console.log(projects);

  const projectsList: JSX.Element[] = [];

  projects.forEach((project) => {
    projectsList.push(
      <div key={project.id} className="cols-sm">
        <ProjectsListCard project={project} />
        <ProjectForm />
      </div>
    );
  });

  return (
    <div>
      <h5>Projects List Items</h5>
      <div className="row" style={{ justifyContent: "space-between" }}>
        {projectsList}
      </div>
    </div>
  );
};

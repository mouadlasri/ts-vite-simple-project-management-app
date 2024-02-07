import React from "react";

import "./ProjectsList.css";

import { Project } from "../../../models/Project";
import { ProjectsListCard } from "../ProjectsListCard";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  console.log(projects);

  const projectsList: JSX.Element[] = [];

  projects.forEach((project) => {
    projectsList.push(<ProjectsListCard project={project} />);
  });

  return (
    <div>
      <h5>Projects List Items</h5>
      {projectsList}
    </div>
  );
};

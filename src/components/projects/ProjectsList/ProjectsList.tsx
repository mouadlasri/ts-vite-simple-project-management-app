import React, { useState } from "react";

import "./ProjectsList.css";

import { Project } from "../../../models/Project";
import { ProjectsListCard } from "../ProjectsListCard";
import { ProjectForm } from "../ProjectForm";

interface ProjectsListProps {
  projects: Project[];
}

export const ProjectsList = ({ projects }: ProjectsListProps) => {
  // state variable that holds the current project that is being edited
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    // console.log(`Project being edited: ${JSON.stringify(project)}`);
    setProjectBeingEdited(project);
  };

  console.log(projects);

  const projectsList: JSX.Element[] = [];

  projects.forEach((project) => {
    projectsList.push(
      <div key={project.id} className="cols-sm">
        {project === projectBeingEdited ? <ProjectForm /> : <ProjectsListCard project={project} onEdit={handleEdit} />}
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

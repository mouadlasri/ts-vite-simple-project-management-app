import React, { useState } from "react";

import "./ProjectsList.css";

import { Project } from "../../../models/Project";
import { ProjectsListCard } from "../ProjectsListCard";
import { ProjectForm } from "../ProjectForm";

interface ProjectsListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

export const ProjectsList = ({ projects, onSave }: ProjectsListProps) => {
  // state variable that holds the current project that is being edited
  // (only ONE project at a time can be in this state variable)
  // NOTE: This state variable is changed in the Child component -> "ProjectsListCard" (two-way communication between Parent and Child)
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    // console.log(`Project being edited: ${JSON.stringify(project)}`);
    setProjectBeingEdited(project);
  };

  // Form function: function to handle cancel edditing in the form
  const handleCancel = () => {
    setProjectBeingEdited({}); // set the current project being edited to empty or None
  };

  const projectsList: JSX.Element[] = [];

  projects.forEach((project) => {
    projectsList.push(
      <div key={project.id} className="cols-sm">
        {/* if current project is being edited, then show form, otherwise show project information */}
        {project === projectBeingEdited ? (
          <ProjectForm onSave={onSave} onCancel={handleCancel} initialProject={project} />
        ) : (
          <ProjectsListCard project={project} onEdit={handleEdit} />
        )}
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

import React from "react";

import "./ProjectsPage.css";

import { ProjectsList } from "./ProjectsList/";
import { Project } from "../../models/Project";
import { MOCK_PROJECTS } from "../../data/MockProjects";

export const ProjectsPage = () => {
  const saveProject = (project: Project) => {
    console.log("Saving project", project);
  };

  return (
    <div>
      <h1>Projects</h1>
      <ProjectsList onSave={saveProject} projects={MOCK_PROJECTS} />
    </div>
  );
};

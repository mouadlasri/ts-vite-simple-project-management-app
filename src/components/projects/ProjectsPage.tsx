import React from "react";

import "./ProjectsPage.css";

import { ProjectsList } from "./ProjectsList/";

import { MOCK_PROJECTS } from "../../data/MockProjects";

export const ProjectsPage = () => {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectsList projects={MOCK_PROJECTS} />
    </div>
  );
};

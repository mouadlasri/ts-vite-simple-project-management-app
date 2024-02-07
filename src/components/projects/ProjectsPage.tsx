import React from "react";

import "./ProjectsPage.css";

import { MOCK_PROJECTS } from "../../data/MockProjects";

export const ProjectsPage = () => {
  return (
    <div>
      <h1>Projects</h1>
      <pre>{JSON.stringify(MOCK_PROJECTS, null, " ")}</pre>
    </div>
  );
};

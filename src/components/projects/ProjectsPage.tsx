import React, { useState } from "react";

import "./ProjectsPage.css";

import { ProjectsList } from "./ProjectsList/";
import { Project } from "../../models/Project";
import { MOCK_PROJECTS } from "../../data/MockProjects";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    // console.log("Saving project", project);
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h1>Projects</h1>
      <ProjectsList onSave={saveProject} projects={projects} />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { projectAPI } from "./projectAPI";

import "./ProjectsPage.css";

import { ProjectsList } from "./ProjectsList/";
import { Project } from "../../models/Project";
import { MOCK_PROJECTS } from "../../data/MockProjects";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // load projects from API
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(1);
        setError("");
        setProjects(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const saveProject = (project: Project) => {
    // console.log("Saving project", project);
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  return (
    <>
      <div>
        <h1>Projects</h1>

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse"></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}

        <ProjectsList onSave={saveProject} projects={projects} />
        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
};

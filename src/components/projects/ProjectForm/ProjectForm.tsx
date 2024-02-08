import React, { SyntheticEvent, useState } from "react";

import { Project } from "../../../models/Project";

import "./ProjectForm.css";

interface ProjectFormProps {
  initialProject: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

// onSave is the handleCancel function in parent component (ProjectList.tsx)
export const ProjectForm = ({ initialProject, onSave, onCancel }: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(project);
  };

  // use one function to handle the change of all input elements in the form
  // alternative: use different handling function for each input element
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target; // deconstruct the event target

    // if input type is checkbox, use checked
    // otherwise its type is text, number etc. so use value to event.target
    let updatedValue = type === "checkbox" ? checked : value;

    // if input is number convert the updatedValue stirng to a number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    // use spread operator to keep the existing project properties that aren't being edited (like project.id), and updated the rest
    setProject((project) => {
      updatedProject = new Project({ ...project, ...change });
      return updatedProject;
    });
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />

      <label htmlFor="description">Project Description</label>
      <input type="text" name="description" placeholder="enter description" value={project.description} onChange={handleChange} />

      <label htmlFor="budget">Project Budget</label>
      <input type="text" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />

      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
};

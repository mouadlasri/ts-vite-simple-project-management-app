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

  // errors object to hold form errors in the component's state
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const validateForm = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };

    if (project.name.length === 0) {
      errors.name = "Name is required.";
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }

    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }

    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }

    return errors;
  };

  const isValidForm = () => {
    return errors.name.length === 0 && errors.description.length && errors.budget.length === 0;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    // check if form is valid
    if (!isValidForm()) return;

    onSave(project);
  };

  // use one function to handle the change of all input elements in the form
  // alternative: use different handling function for each input element
  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target; // deconstruct the event target

    // if input type is checkbox, use checked
    // otherwise its type is text, number etc. so use value to event.target
    let updatedValue = type === "checkbox" ? checked : value;

    // if input is number convert the updatedValue string to a number
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

    setErrors(() => validateForm(updatedProject));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <input type="text" name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input type="text" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

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

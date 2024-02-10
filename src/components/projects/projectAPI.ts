import { Project } from "../../models/Project";

/**
 * Base URL for the API server.
 */
const baseUrl = "http://localhost:4000";

/**
 * URL for the projects endpoint.
 */
const url = `${baseUrl}/projects`;

/**
 * Translates the HTTP status code to an error message.
 * @param status - The HTTP status code.
 * @returns The corresponding error message.
 */
function translateStatusToErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

/**
 * Checks the response status and throws an error if it is not ok.
 * @param response - The response object.
 * @returns The response object if the status is ok.
 * @throws An error with the corresponding error message if the status is not ok.
 */
function checkStatus(response: any): any {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };

    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

/**
 * Parses the response as JSON.
 * @param response - The response object.
 * @returns A promise that resolves to the parsed JSON data.
 */
function parseJSON(response: Response): Promise<any> {
  return response.json();
}

/**
 * Delays the execution by the specified number of milliseconds.
 * @param ms - The number of milliseconds to delay.
 * @returns A function that resolves to the input value after the delay.
 */
function delay(ms: number): (x: any) => Promise<any> {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

/**
 * Converts an array of JSON data to an array of Project objects.
 * @param data - The array of JSON data.
 * @returns An array of Project objects.
 */
function convertToProjectModels(data: any[]): Project[] {
  const projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

/**
 * Converts JSON data to a Project object.
 * @param item - The JSON data.
 * @returns A Project object.
 */
function convertToProjectModel(item: any): Project {
  return new Project(item);
}

/**
 * API for interacting with projects.
 */
const projectAPI = {
  /**
   * Retrieves projects from the server.
   * @param page - The page number.
   * @param limit - The maximum number of projects per page.
   * @returns A promise that resolves to an array of Project objects.
   * @throws An error if there was an error retrieving the projects.
   */
  get(page = 1, limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the projects. Please try again.");
      });
  },

  /**
   * Updates a project on the server.
   * @param project - The updated project object.
   * @returns A promise that resolves to the updated project object.
   * @throws An error if there was an error updating the project.
   */
  put(project: Project) {
    return fetch(`${url}/${project.id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("Log client error: " + error);
        throw new Error("There was an error updating the project. Please try again.");
      });
  },
};

export { projectAPI };

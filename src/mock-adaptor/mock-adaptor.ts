import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Project } from "../api/projects/project.types";

const mock = new MockAdapter(axios, { delayResponse: 600 });

// PROJECTS API
const getProjectsFromLocalStorage = () => {
  const storedProjects = localStorage.getItem("projects");
  const storedFavProjectIds = localStorage.getItem("favProjectIds");
  const favProjectIds = storedFavProjectIds
    ? JSON.parse(storedFavProjectIds)
    : [];
  const projects = storedProjects ? JSON.parse(storedProjects) : [];
  return projects.map((project: Project) => ({
    ...project,
    isFav: favProjectIds.includes(project.id),
  }));
};

mock.onGet("/api/projects").reply(() => {
  return [200, getProjectsFromLocalStorage()];
});

// GET FAV PROJECTS
const getFavoriteProjectsFromLocalStorage = () => {
  const storedProjects = getProjectsFromLocalStorage();
  const storedFavProjectIds = localStorage.getItem("favProjectIds");
  const favProjectIds = storedFavProjectIds
    ? JSON.parse(storedFavProjectIds)
    : [];
  return storedProjects.filter((project: Project) =>
    favProjectIds.includes(project.id)
  );
};

mock.onGet("/api/projects/fav").reply(() => {
  return [200, getFavoriteProjectsFromLocalStorage()];
});

// PROJECT FAV
mock.onPut(/\/api\/projects\/(\d+)\/fav/).reply((config) => {
  const projectId = config.url?.match(/\/api\/projects\/(\d+)\/fav/)?.[1];
  if (!projectId) {
    return [400, { message: "Project ID is required" }];
  }
  const storedFavProjectIds = localStorage.getItem("favProjectIds");
  let favProjectIds: string[] = storedFavProjectIds
    ? JSON.parse(storedFavProjectIds)
    : [];
  if (favProjectIds.includes(projectId)) {
    favProjectIds = favProjectIds.filter((id) => id !== projectId);
  } else {
    favProjectIds.push(projectId);
  }
  localStorage.setItem("favProjectIds", JSON.stringify(favProjectIds));
  return [200, { isFav: favProjectIds.includes(projectId) }];
});

// CREATE PROJECT
const createProjectInLocalStorage = (newProject: Project) => {
  const storedProjects = getProjectsFromLocalStorage();
  const updatedProjects = [...storedProjects, newProject];
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  return newProject;
};

mock.onPost("/api/projects").reply((config) => {
  const newProject = JSON.parse(config.data);
  const projects = getProjectsFromLocalStorage();
  newProject.id = (projects.length + 1).toString();
  const createdProject = createProjectInLocalStorage(newProject);
  return [201, createdProject];
});

// GET PROJECT BY ID
const getProjectByIdFromLocalStorage = (id: string) => {
  const storedProjects = getProjectsFromLocalStorage();
  return (
    storedProjects.find((project: Project) => project.id === id.toString()) ||
    null
  );
};

mock.onGet(/\/api\/projects\/(\d+)/).reply((config) => {
  const projectId = parseInt(
    config.url?.match(/\/api\/projects\/(\d+)/)?.[1] || "0"
  );
  const project = getProjectByIdFromLocalStorage(projectId as any);
  if (project) {
    return [200, project];
  } else {
    return [404, { message: "Project not found" }];
  }
});

// UPDATE PROJECT
const updateProjectInLocalStorage = (updatedProject: Project) => {
  let storedProjects = getProjectsFromLocalStorage();
  const projectIndex = storedProjects.findIndex(
    (project: Project) => project.id === updatedProject.id
  );
  if (projectIndex !== -1) {
    storedProjects[projectIndex] = updatedProject;
    localStorage.setItem("projects", JSON.stringify(storedProjects));
    return true;
  }
  return false;
};

mock.onPut(/\/api\/projects\/(\d+)/).reply((config) => {
  const projectId = parseInt(
    config.url?.match(/\/api\/projects\/(\d+)/)?.[1] || "0"
  );
  const updatedProject = JSON.parse(config.data);
  updatedProject.id = projectId.toString();
  const isUpdated = updateProjectInLocalStorage(updatedProject);
  if (isUpdated) {
    return [200, updatedProject];
  } else {
    return [404, { message: "Project not found" }];
  }
});

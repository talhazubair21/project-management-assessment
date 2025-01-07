import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Project } from "../api/projects/project.types";

const mock = new MockAdapter(axios);

const getProjectsFromLocalStorage = () => {
  const storedProjects = localStorage.getItem("projects");
  return storedProjects ? JSON.parse(storedProjects) : [];
};

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

const getProjectByIdFromLocalStorage = (id: string) => {
  const storedProjects = getProjectsFromLocalStorage();
  return (
    storedProjects.find((project: Project) => project.id === id.toString()) ||
    null
  );
};

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

mock.onGet("/api/projects").reply(200, getProjectsFromLocalStorage());

mock
  .onGet("/api/projects/fav")
  .reply(200, getFavoriteProjectsFromLocalStorage());

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

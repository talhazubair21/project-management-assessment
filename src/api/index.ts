import axios from "axios";
import { Project } from "../interfaces/Project";
import { toast } from "react-toastify";

export const getProjects = async () => {
  try {
    const response = await axios.get(`/api/projects`);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch projects. Please try again later.", {
      toastId: "fetchProjectsError",
    });
  }
};

export const getFavProjects = async () => {
  try {
    const response = await axios.get(`/api/projects/fav`);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch favorite projects. Please try again later.", {
      toastId: "getFavProjectsError",
    });
  }
};

export const getProject = async (id: string) => {
  try {
    const response = await axios.get(`/api/projects/${id}`);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch the project. Please try again later.", {
      toastId: "getProjectError",
    });
  }
};

export const updateProject = async (id: string, payload: Project) => {
  try {
    const response = await axios.put(`/api/projects/${id}`, payload);
    return response.data;
  } catch (error: any) {
    toast.error("Failed to update the project. Please try again later.", {
      toastId: "updateProjectError",
    });
  }
};

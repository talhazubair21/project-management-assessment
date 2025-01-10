import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { appQueryClient } from "../queryClient";
import { ACTION_KEYS, QUERY_KEYS } from "../queryKeys";
import {
  UpdateProjectPayload,
  GetProjectResponse,
  GetProjectsResponse,
} from "./project.types";

export const useUpdateProject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.UPDATE],
    mutationFn: async (payload: UpdateProjectPayload) => {
      const { data } = await axios.put<boolean>(
        `/api/projects/${payload.id}`,
        payload
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Project updated successfully", {
        toastId: "update-project-success",
      });
      await appQueryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT],
      });
      await appQueryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAV_PROJECT],
      });
      navigate("/projects");
    },
    onError: (error) => {
      toast.error("Error creating project", {
        toastId: "update-project-error",
      });
    },
  });
};

export const useCreateProject = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.CREATE],
    mutationFn: async (payload: UpdateProjectPayload) => {
      const { data } = await axios.post<boolean>(`/api/projects`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Project created successfully", {
        toastId: "create-project-success",
      });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECT] });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAV_PROJECT] });
      navigate("/projects");
    },
    onError: (error) => {
      toast.error("Error updating project", {
        toastId: "create-project-error",
      });
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.GET],
    queryFn: async () => {
      const { data } = await axios.get<GetProjectsResponse>(`/api/projects`);
      return data;
    },
    throwOnError(error) {
      toast.error("Failed to fetch projects", {
        toastId: "get-projects-error",
      });
      return false;
    },
  });
};

export const useGetFavProjects = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FAV_PROJECT, ACTION_KEYS.GET],
    queryFn: async () => {
      const { data } = await axios.get<GetProjectsResponse>(
        `/api/projects/fav`
      );
      return data;
    },
    throwOnError(error) {
      toast.error("Failed to fetch fav projects", {
        toastId: "get-fav-project-error",
      });
      return false;
    },
  });
};

export const useGetProject = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.GET_BY_ID, id],
    queryFn: async () => {
      const { data } = await axios.get<GetProjectResponse>(
        `/api/projects/${id}`
      );
      return data;
    },
    enabled,
    throwOnError() {
      toast.error("Error fetching project details", {
        toastId: "get-project-error",
      });
      return false;
    },
  });
};

export const useUpdateFavProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.UPDATE],
    mutationFn: async (projectId: string) => {
      const { data } = await axios.put<boolean>(
        `/api/projects/${projectId}/fav`
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Project favorite status modified", {
        toastId: "project-fav-action-success",
      });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECT] });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAV_PROJECT] });
      navigate(location.pathname);
    },
    onError: () => {
      toast.error("Error modifying the fav status", {
        toastId: "project-fav-action-error",
      });
    },
  });
};

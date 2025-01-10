import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
        toastId: "project-updated",
      });
      await appQueryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT],
      });
      await appQueryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAV_PROJECT],
      });
      // window.location.href = "/projects";
      // navigate("/projects");
    },
    onError: (error) => {
      toast.error("Error creating project", {
        toastId: "creating-project",
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
        toastId: "project-updated",
      });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECT] });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAV_PROJECT] });
      window.location.href = "/projects";
      // navigate("/projects");
    },
    onError: (error) => {
      toast.error("Error updating project", {
        toastId: "update-project",
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
        toastId: "get-projects",
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
        toastId: "get-fav-project",
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
    throwOnError(error) {
      toast.error("Failed to fetch project detail", { toastId: "get-project" });
      return false;
    },
  });
};

export const useUpdateFavProject = () => {
  const navigate = useNavigate();
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
        toastId: "project-fav-action-successfuly",
      });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECT] });
      appQueryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAV_PROJECT] });
      window.location.href = window.location.href;
      navigate(window.location.href);
    },
    onError: (error) => {
      toast.error("Error modifying the fav status", {
        toastId: "making-project-fav",
      });
    },
  });
};

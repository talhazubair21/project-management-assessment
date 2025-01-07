import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  UpdateProjectPayload,
  GetProjectResponse,
  GetProjectsResponse,
} from "./project.types";
import { ACTION_KEYS, QUERY_KEYS } from "../queryKeys";
import { toast } from "react-toastify";
import axios from "axios";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.UPDATE],
    mutationFn: async (payload: UpdateProjectPayload) => {
      const { data } = await axios.put<boolean>(
        `/api/projects/${payload.id}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.GET],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAV_PROJECT, ACTION_KEYS.GET],
      });
      window.location.href = "/projects";
    },
    onError: (error) => {
      toast.error("Error updating project");
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
      toast.error("Failed to fetch projects");
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
      toast.error("Failed to fetch fav projects");
      return false;
    },
  });
};

export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROJECT, ACTION_KEYS.GET_BY_ID, id],
    queryFn: async () => {
      const { data } = await axios.get<GetProjectResponse>(
        `/api/projects/${id}`
      );
      return data;
    },
    throwOnError(error) {
      toast.error("Failed to fetch project detail");
      return false;
    },
  });
};

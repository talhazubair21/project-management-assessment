export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

export interface FavProject extends Project {
  isFav: boolean;
}

export type UpdateProjectPayload = FavProject;
export type GetProjectsResponse = FavProject[];
export type GetProjectResponse = FavProject;

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

export type UpdateProjectPayload = Project;
export type GetProjectsResponse = Project[];
export type GetProjectResponse = Project;

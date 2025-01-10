import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Project name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.string().min(1, { message: "Start Date is required" }),
  endDate: z.string().min(1, { message: "End Date is required" }),
  projectManager: z.string().min(1, { message: "Project Manager is required" }),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;

export const ProjectSchemaResolver = zodResolver(ProjectSchema);

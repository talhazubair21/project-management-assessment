import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Project } from "../api/projects/project.types";
import {
  useGetProject,
  useUpdateProject,
  useCreateProject,
} from "../api/projects/project.query";
import { PROJECT_MANAGERS } from "../config";
import Loader from "../components/Loader";
import {
  ProjectFormData,
  ProjectSchemaResolver,
} from "../validations/project.validation";

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();

  const { data: project, isLoading: isLoadingProject } = useGetProject(
    id,
    id !== "new"
  );
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({
    resolver: ProjectSchemaResolver,
    defaultValues: {
      id: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      projectManager: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ProjectFormData) => {
    const formattedData: Project = {
      ...data,
      startDate: dayjs(data.startDate).toISOString(),
      endDate: dayjs(data.endDate).toISOString(),
    };
    if (id === "new") {
      createProject(formattedData);
    } else {
      updateProject(formattedData);
    }
  };

  useEffect(() => {
    if (id === "new") {
      const currentDate = `${dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss")}Z`;
      reset({
        id: "new",
        startDate: currentDate,
        endDate: currentDate,
      });
    } else if (id && project) {
      reset({
        id: project.id,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        projectManager: project.projectManager,
      });
    }
  }, [id, project]);

  return (
    <Loader isLoading={id !== "new" && isLoadingProject}>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">
          {id === "new" ? "Create Project" : "Edit Project"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {id !== "new" && (
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project ID"
                  variant="outlined"
                  fullWidth
                  disabled
                  error={!!errors.id}
                  helperText={errors.id ? "Project ID is required" : ""}
                />
              )}
            />
          )}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Project Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? "Project name is required" : ""}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description ? "Description is required" : ""}
              />
            )}
          />
          <div className="space-x-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    onChange={(date) =>
                      field.onChange(
                        date
                          ? `${dayjs(date).format("YYYY-MM-DDTHH:mm:ss")}Z`
                          : null
                      )
                    }
                    value={dayjs(field?.value) || null}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    onChange={(date) =>
                      field.onChange(
                        date
                          ? `${dayjs(date).format("YYYY-MM-DDTHH:mm:ss")}Z`
                          : null
                      )
                    }
                    value={dayjs(field?.value) || null}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <FormControl fullWidth>
            <InputLabel>Project Manager</InputLabel>
            <Controller
              name="projectManager"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Project Manager"
                  error={!!errors.projectManager}
                >
                  {PROJECT_MANAGERS.map((manager) => (
                    <MenuItem key={manager} value={manager}>
                      {manager}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating || isUpdating || !isValid}
            >
              {isCreating || isUpdating
                ? "Loading..."
                : id === "new"
                ? "Create"
                : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </Loader>
  );
};

export default ProjectForm;

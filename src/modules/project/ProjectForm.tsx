import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { PROJECT_MANAGERS } from "../../config";
import { getProject, updateProject } from "../../api";
import { Project } from "../../interfaces/Project";

interface ProjectFormProps {
  id: string;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectManager: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ id }) => {
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);

  const loadData = async () => {
    if (id) {
      const project = await getProject(id);
      setProject(project);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      projectManager: "",
    },
  });

  const handleGoBack = () => {
    navigate("/projects");
  };

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData: Project = {
        ...data,
        startDate: dayjs(data.startDate).toISOString(),
        endDate: dayjs(data.endDate).toISOString(),
      };
      await updateProject(id, formattedData);
      window.location.href = "/projects";
    } catch (error) {}
  };

  useEffect(() => {
    if (id && project) {
      setValue("id", project.id);
      setValue("name", project.name);
      setValue("description", project.description);
      setValue("startDate", project.startDate);
      setValue("endDate", project.endDate);
      setValue("projectManager", project.projectManager);
    }
  }, [id, project, setValue]);

  return (
    <div className="p-4 space-y-4">
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        className="mb-4"
      >
        Go Back
      </Button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Project Id"
              variant="outlined"
              fullWidth
              disabled
              error={!!errors.id}
              helperText={errors.id ? "Project id is required" : ""}
            />
          )}
        />
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
                    field.onChange(date ? dayjs(date).toDate() : null)
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
                    field.onChange(date ? dayjs(date).toDate() : null)
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
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;

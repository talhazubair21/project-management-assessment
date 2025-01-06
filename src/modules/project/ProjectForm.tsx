import React, { useEffect } from "react";
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

interface ProjectFormProps {
  id: string | undefined;
}

interface FormData {
  id: string;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  projectManager: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ id }) => {
  const navigate = useNavigate();

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
      startDate: null,
      endDate: null,
      projectManager: "",
    },
  });

  const handleGoBack = () => {
    navigate("/projects");
  };

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      startDate: data.startDate ? dayjs(data.startDate).toISOString() : null,
      endDate: data.endDate ? dayjs(data.endDate).toISOString() : null,
    };
    console.log(formattedData);
  };

  useEffect(() => {
    if (id) {
      const project = {
        id: "1",
        name: "Project Alpha",
        description: "This project is about developing an e-commerce platform.",
        startDate: new Date("2025-01-10T00:00:00Z"),
        endDate: new Date("2025-06-01T00:00:00Z"),
        projectManager: "Alice",
      };
      setValue("id", project.id);
      setValue("name", project.name);
      setValue("description", project.description);
      setValue("startDate", project.startDate);
      setValue("endDate", project.endDate);
      setValue("projectManager", project.projectManager);
    }
  }, [id, setValue]);

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

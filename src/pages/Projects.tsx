import React from "react";
import {
  useUpdateFavProject,
  useGetProjects,
} from "../api/projects/project.query";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "../utils";
import { FavProject } from "../api/projects/project.types";
import Loader from "../components/Loader";
import ProjectFavoriteToggler from "../components/ProjectFavoriteToggler";

const Projects: React.FC = () => {
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects();
  const { mutate: updateProjectFavStatus } = useUpdateFavProject();
  const navigate = useNavigate();

  return (
    <Loader isLoading={isProjectsLoading}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Projects</h1>
          <Link to={`/project/new`}>
            <Button variant="contained" size="small">
              Create Project
            </Button>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Project Manager</TableCell>
                <TableCell>Favourite</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects?.map((project: FavProject) => (
                <TableRow
                  key={project.id}
                  hover
                  onClick={() => navigate(`/project/${project.id}/view`)}
                  className="cursor-pointer"
                >
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{formatDate(project.startDate)}</TableCell>
                  <TableCell>{formatDate(project.endDate)}</TableCell>
                  <TableCell>{project.projectManager}</TableCell>
                  <TableCell>
                    <ProjectFavoriteToggler
                      isFav={project.isFav}
                      onToggle={updateProjectFavStatus}
                      projectId={project.id}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Loader>
  );
};

export default Projects;

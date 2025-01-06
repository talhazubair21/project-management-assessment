import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { formatDate } from "../../utils";
import { Project } from "../../interfaces/Project";
import { getProjects } from "../../api";

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadData = async () => {
    const projects = await getProjects();
    setProjects(projects);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-bold text-xl">Projects</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Project Manager</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project: Project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{formatDate(project.startDate)}</TableCell>
                <TableCell>{formatDate(project.endDate)}</TableCell>
                <TableCell>{project.projectManager}</TableCell>
                <TableCell>
                  <Link to={`/project/${project.id}`}>
                    <Button variant="contained" size="small">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;

import React from "react";
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

const projects = [
  {
    id: "1",
    name: "Project A",
    description: "This is the description of Project A",
    startDate: "2025-01-10T00:00:00Z",
    endDate: "2025-06-01T00:00:00Z",
    projectManager: "Alice",
  },
  {
    id: "2",
    name: "Project B",
    description: "This is the description of Project B",
    startDate: "2025-02-15T00:00:00Z",
    endDate: "2025-07-01T00:00:00Z",
    projectManager: "Bob",
  },
  {
    id: "3",
    name: "Project C",
    description: "This is the description of Project C",
    startDate: "2025-03-10T00:00:00Z",
    endDate: "2025-08-20T00:00:00Z",
    projectManager: "Charlie",
  },
  {
    id: "4",
    name: "Project D",
    description: "This is the description of Project D",
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-09-01T00:00:00Z",
    projectManager: "Alice",
  },
  {
    id: "5",
    name: "Project E",
    description: "This is the description of Project E",
    startDate: "2025-05-05T00:00:00Z",
    endDate: "2025-10-15T00:00:00Z",
    projectManager: "David",
  },
  {
    id: "6",
    name: "Project F",
    description: "This is the description of Project F",
    startDate: "2025-06-10T00:00:00Z",
    endDate: "2025-11-01T00:00:00Z",
    projectManager: "Eve",
  },
];

const ProjectTable: React.FC = () => {
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
            {projects.map((project) => (
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

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetFavProjects } from "../api/projects/project.query";
import { CircularProgress } from "@mui/material";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

const Sidebar: React.FC = () => {
  const { data: favProjects, isLoading } = useGetFavProjects();

  return (
    <div className="w-screen md:w-72 bg-gray-800 text-white p-4 min-h-20 md:min-h-screen">
      <div className="py-6">
        <StyledLink to={`/`}>Project Management</StyledLink>
      </div>
      <h2 className="text-2xl font-bold mb-6">Favorite Projects</h2>
      {isLoading ? (
        <div className="w-full h-40 flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ul>
          {favProjects?.map((project) => {
            return (
              <li className="mb-4" key={project.id}>
                <Link
                  to={`/project/${project.id}/view`}
                  className="text-white hover:text-gray-400"
                >
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

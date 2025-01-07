import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetFavProjects } from "../api/projects/project.query";

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

const Sidebar: React.FC = () => {
  const { data: favProjects } = useGetFavProjects();

  return (
    <div className="w-screen md:w-64 bg-gray-800 text-white p-4 min-h-20 md:min-h-screen">
      <div className="py-6">
        <StyledLink to={`/`}>Go To Home</StyledLink>
      </div>
      <h2 className="text-2xl font-bold mb-6">Favorite Projects</h2>
      <ul>
        {favProjects?.map((project) => {
          return (
            <li className="mb-4" key={project.id}>
              <Link
                to={`/project/${project.id}`}
                className="text-white hover:text-gray-400"
              >
                {project.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

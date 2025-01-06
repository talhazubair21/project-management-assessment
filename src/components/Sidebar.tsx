import React from "react";
import { Link } from "react-router-dom";

const favProjects = [
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
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-screen md:w-64 bg-gray-800 text-white p-4 min-h-20 md:min-h-screen">
      <div className="py-6">
        <Link to={`/`}>Go To Home</Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">Favorite Projects</h2>
      <ul>
        {favProjects.map((project) => {
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavProjects } from "../api";
import { Project } from "../interfaces/Project";

const Sidebar: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadData = async () => {
    const projects = await getFavProjects();
    setProjects(projects);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-screen md:w-64 bg-gray-800 text-white p-4 min-h-20 md:min-h-screen">
      <div className="py-6">
        <Link to={`/`}>Go To Home</Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">Favorite Projects</h2>
      <ul>
        {projects.map((project) => {
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

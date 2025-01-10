import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useUpdateFavProject,
  useGetProject,
} from "../api/projects/project.query";
import Loader from "../components/Loader";
import ProjectFavoriteToggler from "../components/ProjectFavoriteToggler";
import { formatDate } from "../utils";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };

  const navigate = useNavigate();

  const { data: project, isLoading } = useGetProject(id);
  const { mutate: updateProjectFavStatus, isPending: isUpdatingFavStatus } =
    useUpdateFavProject();

  if (!project) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No Project Found</p>
      </div>
    );
  }

  return (
    <Loader isLoading={isLoading || isUpdatingFavStatus}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Project Details</h1>
          <ProjectFavoriteToggler
            isFav={project.isFav}
            onToggle={updateProjectFavStatus}
            projectId={project.id}
          />
        </div>
        <div className="space-y-2">
          <div>
            <span className="font-bold">Project ID:</span> {project.id}
          </div>
          <div>
            <span className="font-bold">Name:</span> {project.name}
          </div>
          <div>
            <span className="font-bold">Description:</span>{" "}
            {project.description}
          </div>
          <div>
            <span className="font-bold">Start Date:</span>{" "}
            {formatDate(project.startDate)}
          </div>
          <div>
            <span className="font-bold">End Date:</span>{" "}
            {formatDate(project.startDate)}
          </div>
          <div>
            <span className="font-bold">Project Manager:</span>{" "}
            {project.projectManager}
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => navigate("/projects")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <Link to={`/project/${id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </Loader>
  );
};

export default ProjectDetail;

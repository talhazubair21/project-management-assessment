import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>Project Detail for ID: {id}</p>
    </div>
  );
};

export default ProjectDetail;

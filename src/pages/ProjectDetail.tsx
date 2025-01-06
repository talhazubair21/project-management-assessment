import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectForm from "../modules/Project/ProjectForm";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const safeId = id ?? "defaultId";
  return (
    <Layout>
      <ProjectForm id={safeId} />
    </Layout>
  );
};

export default ProjectDetail;

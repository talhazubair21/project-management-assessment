import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectForm from "../modules/Project/ProjectForm";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Layout>
      <ProjectForm id={id} />
    </Layout>
  );
};

export default ProjectDetail;

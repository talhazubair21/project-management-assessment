import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Projects from "../pages/Projects";
import ProjectForm from "../pages/ProjectForm";
import ProjectDetail from "../pages/ProjectDetail";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<Layout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id/view" element={<ProjectDetail />} />
          <Route path="/project/:id" element={<ProjectForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;

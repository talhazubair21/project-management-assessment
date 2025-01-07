import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./mock-adaptor/mock-adaptor";
import { appQueryClient } from "./api/queryClient";
import useInitialize from "./hooks/useInitialize";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

const App: React.FC = () => {
  useInitialize();
  return (
    <>
      <QueryClientProvider client={appQueryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
};

export default App;

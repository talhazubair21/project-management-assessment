import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appQueryClient } from "./api/queryClient";
import useInitialize from "./hooks/useInitialize";
import "./mock-adaptor/mock-adaptor";
import AppRoutes from "./routes/routes";

const App: React.FC = () => {
  useInitialize();
  return (
    <QueryClientProvider client={appQueryClient}>
      <AppRoutes />
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

import { CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

interface LoaderProps {
  children: ReactNode;
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ children, isLoading }) => {
  return isLoading ? (
    <div className="flex justify-center items-center h-full">
      <CircularProgress />
    </div>
  ) : (
    children
  );
};

export default Loader;

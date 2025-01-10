import React from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

interface ProjectFavoriteTogglerProps {
  isFav: boolean;
  projectId: string;
  onToggle: (projectId: string) => void;
}

const ProjectFavoriteToggler: React.FC<ProjectFavoriteTogglerProps> = ({
  isFav,
  projectId,
  onToggle,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(projectId);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isFav ? <Favorite color="primary" /> : <FavoriteBorder color="action" />}
    </div>
  );
};

export default ProjectFavoriteToggler;

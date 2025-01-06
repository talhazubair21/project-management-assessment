import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/projects");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Welcome to the Project Management App
        </h1>
        <button
          onClick={handleGetStarted}
          className="px-4 py-2 md:px-6 md:py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

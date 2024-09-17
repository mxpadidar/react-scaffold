import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl text-primary mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button onClick={goHome} className="text-primary">
        <HomeIcon className="w-6 h-6 ml-2" />
      </button>
    </div>
  );
};

export default NotFoundPage;

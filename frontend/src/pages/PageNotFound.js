import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="text-center px-6 py-12">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

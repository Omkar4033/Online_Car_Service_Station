import React from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ currentStep, darkMode }) => {
  const steps = [ "cart","select-car", "contact-info", "payment", "confirmation"];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div
      className={`flex items-center justify-center my-4 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-800"
      } rounded-lg py-3`}
    >
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <Link to={`/user/${step}`} className={`w-8 h-8`}>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                index <= currentIndex
                  ? darkMode
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-yellow-400 text-gray-800"
                  : "bg-gray-500 text-gray-300"
              }`}
            >
              {index + 1}
            </div>
          </Link>
          <span className="mx-2 font-semibold capitalize">
            {step.replace(/-/g, ' ')}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`w-12 h-1 ${
                index < currentIndex
                  ? darkMode
                    ? "bg-yellow-500"
                    : "bg-yellow-400"
                  : "bg-gray-500"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

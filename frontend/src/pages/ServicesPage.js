import React from "react";
import { useSelector } from "react-redux";
import AddCarDetails from "../pages/Dashboard/CustomerPanel/AddCarDetails";
import ServiceSideBar from "./serviceSideBar";
import ServiceContent from "./ServiceContent";

const ServicesPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [isAddingCar, setIsAddingCar] = React.useState(false);

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      <ServiceSideBar darkMode={darkMode} setIsAddingCar={setIsAddingCar} />
      <main className="w-3/4 p-6">
        {isAddingCar ? (
          <AddCarDetails setIsAddingCar={setIsAddingCar} />
        ) : (
          <ServiceContent darkMode={darkMode} />
        )}
      </main>
    </div>
  );
};

export default ServicesPage;

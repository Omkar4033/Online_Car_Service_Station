import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddCarDetails from "./Dashboard/CustomerPanel/AddCarDetails";

const ServicesPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Expanded services with new categories and items
  const categories = {
    Maintenance: [
      { id: 1, name: "Oil Change", description: "Complete oil change service", price: 50 },
      { id: 2, name: "Tire Rotation", description: "Tire rotation for safety", price: 30 },
      { id: 3, name: "Coolant Check", description: "Check and refill coolant", price: 25 },
      { id: 4, name: "Brake Fluid Replacement", description: "Replace old brake fluid", price: 40 },
      { id: 5, name: "Air Filter Replacement", description: "Replace air filter for cleaner air", price: 35 },
    ],
    Repair: [
      { id: 6, name: "Brake Inspection", description: "Comprehensive brake inspection", price: 40 },
      { id: 7, name: "Battery Replacement", description: "Car battery replacement", price: 80 },
      { id: 8, name: "Suspension Repair", description: "Repair car suspension system", price: 150 },
      { id: 9, name: "Exhaust System Repair", description: "Fix exhaust leaks or damages", price: 100 },
      { id: 10, name: "Transmission Repair", description: "Repair or service transmission", price: 300 },
    ],
    Diagnostics: [
      { id: 11, name: "Engine Diagnostics", description: "Detailed engine diagnostics", price: 100 },
      { id: 12, name: "AC Repair", description: "Air conditioning system repair", price: 120 },
      { id: 13, name: "Electrical System Check", description: "Inspect and diagnose electrical issues", price: 90 },
      { id: 14, name: "Fuel System Test", description: "Check fuel system performance", price: 80 },
      { id: 15, name: "Emissions Test", description: "Test vehicle emissions compliance", price: 50 },
    ],
    Cleaning: [
      { id: 16, name: "Car Wash", description: "Exterior and interior cleaning", price: 25 },
      { id: 17, name: "Fuel System Cleaning", description: "Enhance fuel efficiency", price: 70 },
      { id: 18, name: "Engine Cleaning", description: "Deep cleaning of engine compartment", price: 100 },
      { id: 19, name: "Headlight Polishing", description: "Restore clarity to headlights", price: 30 },
      { id: 20, name: "Interior Vacuuming", description: "Thorough vacuuming of the interior", price: 40 },
    ],
    Tires: [
      { id: 21, name: "Tire Installation", description: "Install new tires on your vehicle", price: 60 },
      { id: 22, name: "Wheel Alignment", description: "Align wheels for better handling", price: 70 },
      { id: 23, name: "Tire Balancing", description: "Balance tires to reduce vibrations", price: 50 },
      { id: 24, name: "Flat Tire Repair", description: "Repair punctured or damaged tires", price: 25 },
      { id: 25, name: "Tire Pressure Check", description: "Ensure proper tire pressure", price: 10 },
    ],
    Accessories: [
      { id: 26, name: "Car Stereo Installation", description: "Install or upgrade car stereo system", price: 150 },
      { id: 27, name: "Dash Cam Installation", description: "Install a dash cam for security", price: 100 },
      { id: 28, name: "Window Tinting", description: "Tint car windows for privacy", price: 200 },
      { id: 29, name: "Seat Covers", description: "Install new seat covers", price: 80 },
      { id: 30, name: "Floor Mats", description: "Provide durable floor mats", price: 50 },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Maintenance"); // Default category
  const [cart, setCart] = useState([]);
  const [isAddingCar, setIsAddingCar] = useState(false);

  console.log("add car details   :  "+cart);

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      {/* Sidebar */}
      <aside className={`w-1/4 p-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex items-center justify-center border-dashed border-2 p-6 rounded-lg">
          <button
            className="text-lg font-semibold"
            onClick={() => setIsAddingCar(true)}
          >
            + Add Car
          </button>
        </div>
        <div className="mt-8">
          <h2 className="font-bold mb-4">Upcoming Services</h2>
          <ul className="space-y-2">
            <li>Oil Change</li>
            <li>AC Repair</li>
            <li>Brake Inspection</li>
          </ul>
        </div>

        {/* Advertisement Section */}
        <div
          className={`mt-8 p-4 rounded-lg shadow-md ${darkMode ? "bg-yellow-700 text-gray-100" : "bg-yellow-100"}`}
        >
          <h3 className="text-xl font-bold">Advertisement</h3>
          <p className="text-sm">Special Offer! Get 20% off on your first service!</p>
          <button className="mt-2 py-1 px-4 bg-yellow-300 text-black rounded-md hover:bg-yellow-400">
            Learn More
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6">
        {isAddingCar ? (
          <div className="mt-4">
            <AddCarDetails  setIsAddingCar={setIsAddingCar} />
          </div>
        ) : (
          <>
            {/* Service Categories */}
            <div className="flex space-x-4 mb-8">
              {Object.keys(categories).map((category, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-md font-semibold ${
                    selectedCategory === category
                      ? darkMode
                        ? "bg-yellow-300 text-gray-900"
                        : "bg-yellow-300 text-gray-900"
                      : darkMode
                      ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Services for Selected Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories[selectedCategory].map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  <div className="h-16 w-full bg-gray-300 rounded-md mb-4"></div>
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  <p className="text-sm">{service.description}</p>
                  <p className="text-lg font-bold mt-2">${service.price}</p>
                  <button
                    className={`mt-4 py-2 px-4 rounded shadow ${
                      darkMode
                        ? "bg-yellow-300 text-black hover:bg-yellow-400"
                        : "bg-yellow-300 text-white hover:bg-yellow-400"
                    }`}
                    onClick={() => addToCart(service)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ServicesPage;

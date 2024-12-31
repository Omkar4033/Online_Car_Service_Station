import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddCarDetails from '../pages/Dashboard/CustomerPanel/AddCarDetails';
import CustomerSideBar from "./CustomerSideBar";
import Loader from "../components/Loader";


const ServicesPage = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [cart, setCart] = useState([]);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/services/categories");
        
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      finally{
        //setIsLoading(false);
      }
    };

    fetchCategories();
    fetchServicesByCategory(1); // Fetch uncategorized services initially
  }, []);

  const fetchServicesByCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services${`?categoryId=${categoryId}`}`
      );
  
      console.log(`http://localhost:5000/api/services${categoryId ? `?categoryId=${categoryId}` : ""}`);
  
      if (response.status === 200) {
        setServices(
          response.data.map((item) => ({
            id: item.id,
            name: item.Name,
            description: item.Description,
            price: parseFloat(item.Price),
            category_ids: item.category_ids,
            category_names: item.category_names,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchServicesByCategory(categoryId);
  };

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}`}
    >
      {/* Sidebar */}
     <CustomerSideBar darkMode={darkMode} setIsAddingCar={setIsAddingCar} />

      {/* Main Content */}
      <main className="w-3/4 p-6">
        {isAddingCar ? (
          <AddCarDetails setIsAddingCar={setIsAddingCar} />
        ) : (
          
          isLoading ? Loader ( <Loader/>):
          <> 
            {/* Service Categories */}
            <div className="flex space-x-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`py-2 px-4 rounded-md font-semibold ${
                    selectedCategory === category.id
                      ? darkMode
                        ? "bg-yellow-300 text-gray-900"
                        : "bg-yellow-300 text-gray-900"
                      : darkMode
                      ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.Name}
                </button>
              ))}
            </div>

            {/* Services for Selected Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  <p className="text-sm">{service.description}</p>
                  {/* Display categories */}
                  <p className="text-sm text-gray-500">
                    Categories: {service.category_names ? service.category_names.split(',').join(', ') : 'No categories'}
                  </p>
                  <p className="text-lg font-bold mt-2">₹{service.price.toFixed(2)}</p>
                  <button
                    id={service.id}
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

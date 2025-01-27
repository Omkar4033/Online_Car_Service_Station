import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

const ServiceContent = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState(new Map());
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch services by category and store them in a map
  const fetchServicesByCategory = async (categoryId) => {
    if (servicesByCategory.has(categoryId)) {
      // Use cached services if they exist
      return;
    }

    setIsLoading(true); // Show loader while fetching
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services?categoryId=${categoryId}`
      );
      if (response.status === 200) {
        const fetchedServices = response.data.map((item) => ({
          id: item.id,
          name: item.Name,
          description: item.Description,
          price: parseFloat(item.Price),
          category_ids: item.category_ids,
          category_names: item.category_names,
        }));

        setServicesByCategory((prevMap) => new Map(prevMap.set(categoryId, fetchedServices)));
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false); // Hide loader after fetching
    }
  };

  useEffect(() => {
    // Fetch categories on mount
    const fetchCategories = async () => {
      setIsLoading(true); // Show loader during initial fetch
      try {
        const response = await axios.get("http://localhost:5000/api/services/categories");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false); // Hide loader after fetching
      }
    };

    fetchCategories();
    fetchServicesByCategory(1); // Default fetch for the initial category
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchServicesByCategory(categoryId); // Fetch services for the selected category
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.Name : "No category";
  };

  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  return (
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
        {servicesByCategory.has(selectedCategory)
          ? servicesByCategory.get(selectedCategory).map((service, id) => (
              <div
                key={id}
                className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-sm">{service.description}</p>
                {/* Display categories */}
                <p className="text-sm text-gray-500">
                  Categories: {getCategoryName(selectedCategory)}
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
            ))
          : null}
      </div>

      {isLoading && <Loader />} {/* Add loader component */}
    </>
  );
};

export default ServiceContent;

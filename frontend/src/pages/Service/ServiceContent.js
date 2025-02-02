// ServiceContent.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Use useSelector to access the Redux state
import { addToCart } from "../../redux/actions/cartActions";
import { fetchCategories, fetchServicesByCategory } from "../../services API/serviceAPI";
import Loader from "../../components/Loader";
import { ToastContainer, toast, Zoom } from "react-toastify";
import ServiceCard from "./ServiceCard"; // Import the new ServiceCard component

const ServiceContent = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]); // Changed from Map to simple array
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const notify = () =>
    toast.success("Added to Cart!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      transition: Zoom,
    });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData?.user); // Access the user data from Redux state
    console.log(services)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        // Fetch initial services for the first category
        const fetchedServices = await fetchServicesByCategory(1);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    try {
      const fetchedServices = await fetchServicesByCategory(categoryId);
      setServices(fetchedServices); // Directly setting the fetched services array
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCartHandler = (service) => {
    if (user !== undefined) {
      dispatch(addToCart(service));
      notify(`${service.name} added to cart!`);
    } else {
      toast.warn("Login Required!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
        transition: Zoom,
      });
    }
  };

  return (
    <>
      {/* Service Categories */}
      <div className="flex space-x-5 mb-8">
        {categories.map((category) => (
          <button
            key={category.categoryId}
            className={`py-2 px-4 rounded-md font-semibold ${
              selectedCategory === category.categoryId
                ? darkMode
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-yellow-500 text-gray-900"
                : darkMode
                ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services for Selected Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              darkMode={darkMode}
              addToCartHandler={addToCartHandler}
            />
          ))
        ) : (
          <p>No services available for this category.</p>
        )}
      </div>
      <ToastContainer />
      {isLoading && <Loader />}
    </>
  );
};

export default ServiceContent;

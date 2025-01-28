import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Use useSelector to access the Redux state
import { addToCart } from "../../redux/actions/cartActions";
import {fetchCategories,fetchServicesByCategory,
} from "../../services API/serviceAPI";
import Loader from "../../components/Loader";
import { ToastContainer, toast, Zoom } from "react-toastify";


const ServiceContent = ({ darkMode }) => {
  const [categories, setCategories] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState(new Map());
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
  const user = useSelector((state) => state.auth?.user); // Access the user data from Redux state
 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);

        const fetchedServices = await fetchServicesByCategory(1); // Initial category fetch
        setServicesByCategory((prev) => new Map(prev.set(1, fetchedServices)));
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
    if (!servicesByCategory.has(categoryId)) {
      setIsLoading(true);
      try {
        const fetchedServices = await fetchServicesByCategory(categoryId);
        setServicesByCategory(
          (prev) => new Map(prev.set(categoryId, fetchedServices))
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addToCartHandler = (service) => {
   
    if (user?.user !== undefined) { // Check if the user is logged in
      dispatch(addToCart(service));
      notify(`${service.name} added to cart!`);
    } else {
      toast.warn("Login Required !", {
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
                <p className="text-lg font-bold mt-2">
                  ₹{service.price.toFixed(2)}
                </p>
                <button
                  className={`mt-4 py-2 px-4 rounded shadow ${
                    darkMode
                      ? "bg-yellow-300 text-black hover:bg-yellow-400"
                      : "bg-yellow-300 text-white hover:bg-yellow-400"
                  }`}
                  onClick={() => addToCartHandler(service)}
                >
                  Add to Cart
                </button>
                <ToastContainer />
              </div>
            ))
          : null}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default ServiceContent;

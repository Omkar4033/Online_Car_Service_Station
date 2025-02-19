// Action Types
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_CATEGORIZED_SERVICES = "SET_CATEGORIZED_SERVICES";
export const ADD_TO_CART = "ADD_TO_CART";

// Configuration for Backend URL
const BACKEND_URL = "http://localhost"; // Base URL
const PORT = "5000"; // Port number

// Action Creators
export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

export const setSelectedCategory = (category) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: category,
  };
};

export const setCategorizedServices = (categorizedServices) => {
  return {
    type: SET_CATEGORIZED_SERVICES,
    payload: categorizedServices,
  };
};

export const addToCart = (service) => {
  return {
    type: ADD_TO_CART,
    payload: service,
  };
};


export const fetchServices = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BACKEND_URL}:${PORT}/api/services/`); // Use variable for URL
      const data = await response.json();
      console.log("data is : "+data);
      const categorizedServices = categorizeServices(data);

      const categoriesArray = Object.keys(categorizedServices);
      const defaultCategory = categoriesArray.length ? categoriesArray[0] : "Uncategorized";

   
      dispatch(setCategories(categoriesArray));
      dispatch(setSelectedCategory(defaultCategory));
      dispatch(setCategorizedServices(categorizedServices));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
};

const categorizeServices = (services) => {
  const categorizedServices = {};
  services.forEach((service) => {
    const category = service.categories || "Uncategorized";
    if (!categorizedServices[category]) {
      categorizedServices[category] = [];
    }
    categorizedServices[category].push(service);
  });
  return categorizedServices;
};

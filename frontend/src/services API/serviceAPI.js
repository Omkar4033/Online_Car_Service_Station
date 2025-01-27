import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/services/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchServicesByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/services?categoryId=${categoryId}`);
    
    return response.data.map((item) => ({
      id: item.Service_ID ,
      name: item.Name,
      description: item.Description,
      price: parseFloat(item.Price),
      categoryId: item.Category_ID,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

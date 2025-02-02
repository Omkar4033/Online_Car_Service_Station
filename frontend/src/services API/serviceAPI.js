import axios from "axios";

export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchServicesByCategory = async (categoryId) => {
  try {
    
    const response = await axios.get(`http://localhost:8080/api/services/category/${categoryId}`);
    
    return response.data.map((item) => ({
      id: item.serviceId ,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      categoryId: item.category.categoryId,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

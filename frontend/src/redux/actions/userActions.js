import axios from "axios";

// Set base URL
const url = "http://localhost:5000"; // Ensure the protocol (http://) is included

// Action for user registration
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post(`${url}/api/users/register`, userData); // Adjusted endpoint

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: response.data, // Assuming response contains user data
    });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response?.data?.message || error.message, // Handle cases where response might be undefined
    });
  }
};

// Action for user login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post(`${url}/api/users/login`, credentials); // Adjusted endpoint

    console.log("Response is" + JSON.stringify(response.data));

    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(response.data));

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: response.data, // Assuming response contains user data
    });
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response?.data?.message || error.message, // Handle cases where response might be undefined
    });
  }
};

// Action for user logout
export const userLogout = () => (dispatch) => {
  // Clear user data from localStorage
  localStorage.removeItem("userData");

  // Dispatch logout action
  dispatch({
    type: "USER_LOGOUT",
  });

  // Optionally redirect the user to the login page (if using history or navigate)
  // e.g., navigate("/login");
};

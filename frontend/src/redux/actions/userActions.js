import axios from "axios";

const url = "http://localhost:8080/api/users";


export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post(`${url}/register`, userData);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post(`${url}/login`, credentials);
    
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const userLogout = () => ({
  type: "USER_LOGOUT",
});

// Initial state is an empty object
const initialState = {};

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
    case "USER_LOGIN_REQUEST":
      return { ...state };  // Return current state
    
    case "USER_REGISTER_SUCCESS":
      return { ...state, user: action.payload };
    case "USER_LOGIN_SUCCESS":
      return { ...state, user: action.payload };  
    
    case "USER_REGISTER_FAIL":
    case "USER_LOGIN_FAIL":
      return { ...state };  // No changes on failure
    
    case "USER_LOGOUT":
      return {};  // Reset to empty object on logout
    
    default:
      return state;  // Return current state by default
  }
};

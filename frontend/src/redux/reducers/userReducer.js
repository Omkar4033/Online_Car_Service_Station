const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage if available
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // USER LOGIN REQUEST
    case "USER_LOGIN_REQUEST":
      return { 
        ...state, 
        loading: true, 
        error: null // Clear previous errors when a new request starts
      };

    // USER LOGIN SUCCESS
    case "USER_LOGIN_SUCCESS":
      console.log("Inside reducer action", action.payload);
      // Store the user in localStorage for persistence across page reloads
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        error: null // Clear error on success
      };

    // USER LOGIN FAILURE
    case "USER_LOGIN_FAIL":
      return { 
        ...state, 
        loading: false, 
        error: action.payload // Capture the error message
      };

    // USER REGISTER REQUEST
    case "USER_REGISTER_REQUEST":
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

    // USER REGISTER SUCCESS
    case "USER_REGISTER_SUCCESS":
      console.log("Inside reducer action", action.payload);
      // Store the user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        error: null 
      };

    // USER REGISTER FAILURE
    case "USER_REGISTER_FAIL":
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    // USER LOGOUT
    case "USER_LOGOUT":
      // Remove user from localStorage and reset state
      localStorage.removeItem('user');
      return { 
        ...initialState // Reset state on logout
      };

    default:
      return state;
  }
};

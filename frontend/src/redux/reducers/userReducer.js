const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
    case "USER_LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "USER_REGISTER_SUCCESS":
    case "USER_LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, error: null };
    case "USER_REGISTER_FAIL":
    case "USER_LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};

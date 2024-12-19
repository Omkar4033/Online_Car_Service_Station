const initialState = {
    categories: [],
    selectedCategory: "Uncategorized",
    categorizedServices: {},
    cart: [],
  };
  
  const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return { ...state, categories: action.payload };
      case 'SET_SELECTED_CATEGORY':
        return { ...state, selectedCategory: action.payload };
      case 'SET_CATEGORIZED_SERVICES':
        return { ...state, categorizedServices: action.payload };
      case 'ADD_TO_CART':
        return { ...state, cart: [...state.cart, action.payload] };
      default:
        return state;
    }
  };
  
  export default servicesReducer;
  
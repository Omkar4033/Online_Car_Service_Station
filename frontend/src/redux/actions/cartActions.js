export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (service) => {
  return {
    type: ADD_TO_CART,
    payload: service,
  };
};

export const removeFromCart = (serviceId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: serviceId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

import { SET_BOOKING_DETAILS, CLEAR_BOOKING_DETAILS } from "../actions/bookingActions";

const initialState = {
  serviceIds: [],  // Array of selected service IDs
  totalAmount: 0,  // Total amount for booking
  carId: null,     // Selected car ID
  userId: null,    // User ID
  addressId: null, // Address ID
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING_DETAILS:
      return { ...state, ...action.payload };

    case CLEAR_BOOKING_DETAILS:
      return initialState;

    default:
      return state;
  }
};

export default bookingReducer;

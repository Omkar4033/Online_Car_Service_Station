export const SET_BOOKING_DETAILS = "SET_BOOKING_DETAILS";
export const CLEAR_BOOKING_DETAILS = "CLEAR_BOOKING_DETAILS";

export const setBookingDetails = (bookingData) => ({
  type: SET_BOOKING_DETAILS,
  payload: bookingData,
});

export const clearBookingDetails = () => ({
  type: CLEAR_BOOKING_DETAILS,
});

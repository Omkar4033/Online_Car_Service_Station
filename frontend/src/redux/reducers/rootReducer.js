// src/redux/reducers/index.js
import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer"; // Import your reducer(s)
import { userReducer } from "./userReducer";
import serviceReducer from './serviceReducer';
import cartReducer from "./CartReducer";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Add all reducers here
  userData:userReducer,
  services:serviceReducer,
  cart:cartReducer,
  booking:bookingReducer
});

export default rootReducer;

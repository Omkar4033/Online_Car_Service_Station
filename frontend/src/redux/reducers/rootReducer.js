// src/redux/reducers/index.js
import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer"; // Import your reducer(s)
import { userReducer } from "./userReducer";
import serviceReducer from './serviceReducer';
import cartReducer from "./CartReducer";

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Add all reducers here
  auth:userReducer,
  services:serviceReducer,
  cart:cartReducer
});

export default rootReducer;

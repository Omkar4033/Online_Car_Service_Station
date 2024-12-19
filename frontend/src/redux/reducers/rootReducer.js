// src/redux/reducers/index.js
import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer"; // Import your reducer(s)
import { userReducer } from "./userReducer";
import serviceReducer from './serviceReducer';

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Add all reducers here
  auth:userReducer,
  services:serviceReducer
});

export default rootReducer;

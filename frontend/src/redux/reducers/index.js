// src/redux/reducers/index.js
import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer"; // Import your reducer(s)

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Add all reducers here
});

export default rootReducer;

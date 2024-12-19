// src/redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer, // Combine reducers
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
});

export default store;

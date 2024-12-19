import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: false, // Initial state for dark mode
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Toggle dark mode
    },
  },
});

// Export the reducer as default
export default darkModeSlice.reducer;

// Export the action
export const { toggleDarkMode } = darkModeSlice.actions;

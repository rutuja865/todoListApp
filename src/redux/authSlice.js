import { createSlice } from "@reduxjs/toolkit";

// Retrieve token from session storage (if available)
const storedToken = sessionStorage.getItem("token");

const initialState = {
  isAuthenticated: !!storedToken, // If token exists, user is authenticated
  token: storedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Store the token from the action payload
      sessionStorage.setItem("token", action.payload); // Store token in sessionStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      sessionStorage.removeItem("token"); // Remove token from sessionStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// // Used to track the session of the user we use this code.
// // After loging in we have to navigate to anotehr page, and also prevent when try back to naviate in the signin page.
// // At this condition we have to store the abvoe condition state + after signin we also have to show the user details or logout.
// // Therefor for this purpose we wrote this code.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // // In payload send the user details and store in the state.
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogined: false, name: "maro" },
  reducers: {
    logInOut: (state) => {
      state.isLogined = !state.isLogined;
    },
  },
});

export const { logInOut } = authSlice.actions;
export default authSlice.reducer;

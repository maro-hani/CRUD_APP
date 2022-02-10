import { configureStore } from "@reduxjs/toolkit";
import BookReducer from "../store/bookSlice";
import authReducer from "../store/AuthSlice";
import reportReducer from "../store/Report";

export default configureStore({
  reducer: {
    BookReducer,
    authReducer,
    reportReducer,
  },
});

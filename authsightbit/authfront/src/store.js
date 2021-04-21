import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/Signin/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});

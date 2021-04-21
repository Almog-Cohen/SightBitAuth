import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  authenticate,
  authenticateGoogle,
} from "../../utils/apiClient";

export const login = createAsyncThunk(
  "auth/requestStatus",
  async ({ email, password }) => {
    const userData = await authenticate({ email, password });
    return userData;
  }
);

export const googleLogin = createAsyncThunk(
  "auth/requestStatus",
  async (response) => {
    const userData = await authenticateGoogle(response);
    return userData;
  }
);

export const registerUser = createAsyncThunk(
  "auth/requestStatus",
  async ({ username, email, password }) => {
    const userData = await register({ username, email, password });
    return userData;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    userData: "",
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
      // saves user info (which includes the tokens and name) in redux store
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;

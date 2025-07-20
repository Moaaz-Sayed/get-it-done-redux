import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
} from "../../services/apiAuth";
import toast from "react-hot-toast";

// Login thunk

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    const res = await apiLogin(email, password);
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return res.user;
  },
);

// Signup thunk

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }, thunkApi) => {
    const res = await apiSignup({ username, email, password });
    if (!res.success) return thunkApi.rejectWithValue(res.error);
    return res.user;
  },
);

// Logout thunk

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const res = await apiLogout();
  if (!res.success) return thunkApi.rejectWithValue(res.error);
  return true;
});

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // user: null || savedUser,
  user: savedUser || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Logged in successfully!");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(
          `Log in failed: ${action.payload || "Unknown error occurred"}`,
        );
      })

      //  Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        toast.success("Signed up successfully!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(
          `Signup failed: ${action.payload || "Unknown error occurred"}`,
        );
      })

      //Logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`Logout failed: ${action.payload || "Unknown error"}`);
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;

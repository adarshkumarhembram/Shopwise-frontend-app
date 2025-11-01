// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

// Async thunks
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCred.user, { displayName });
      }
      // reload user to get displayName
      const { uid, email: userEmail, displayName: name } = userCred.user;
      return { uid, email: userEmail, name };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName: name } = userCred.user;
      return { uid, email: userEmail, name };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Slice
const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(signupUser.fulfilled, (s, a) => { s.user = a.payload; s.status = "succeeded"; })
      .addCase(signupUser.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; })

      .addCase(loginUser.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => { s.user = a.payload; s.status = "succeeded"; })
      .addCase(loginUser.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || a.error.message; })

      .addCase(logoutUser.fulfilled, (s) => { s.user = null; s.status = "idle"; s.error = null; })
      .addCase(logoutUser.rejected, (s, a) => { s.error = a.payload || a.error.message; });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

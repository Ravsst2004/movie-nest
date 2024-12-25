import { createSlice } from "@reduxjs/toolkit";
import { createSession, fetchRequestToken } from "../thunk/auth-thunk";
import { redirect } from "next/navigation";

type User = {
  id: number;
  name: string;
  username: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path?: string | null;
    };
  };
  iso_639_1: string;
  iso_3166_1: string;
  include_adult: boolean;
};

type AuthState = {
  requestToken: string | null;
  sessionId: string | null;
  loading: boolean;
  error: unknown | null;
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: AuthState = {
  requestToken: null,
  sessionId: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("requestToken");
      sessionStorage.removeItem("sessionId");

      state.requestToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserData: (state, action) => {
      if (!action.payload) {
        state.isAuthenticated = false;
        state.user = null;
      } else {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestToken.fulfilled, (state, action) => {
        state.loading = false;
        state.requestToken = action.payload.request_token;
      })

      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.session_id;
      });
  },
});

export const { logout, setUserData } = authSlice.actions;
export default authSlice.reducer;

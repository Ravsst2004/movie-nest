import { createSlice } from "@reduxjs/toolkit";
import { createSession, fetchRequestToken } from "../thunk/auth-thunk";

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
      state.requestToken = null;
      state.sessionId = null;
    },
    setUserData: (state, action) => {
      if (!action.payload) {
        state.isAuthenticated = false;
        state.user = null;
      }

      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestToken.fulfilled, (state, action) => {
        state.loading = false;
        state.requestToken = action.payload.request_token;
      })
      .addCase(fetchRequestToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.session_id;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUserData } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSession, fetchRequestToken } from "../thunk/auth-thunk";
import { User } from "@/types/user";

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
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
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

export const { logout, setUserData, setSessionId } = authSlice.actions;
export default authSlice.reducer;

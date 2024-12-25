import { createSlice } from "@reduxjs/toolkit";
import { createSession, fetchRequestToken } from "../thunk/auth-thunk";

type AuthState = {
  requestToken: string | null;
  sessionId: string | null;
  loading: boolean;
  error: unknown | null;
};

const initialState: AuthState = {
  requestToken: null,
  sessionId: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.requestToken = null;
      state.sessionId = null;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;

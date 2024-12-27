import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRequestToken = createAsyncThunk(
  "auth/fetchRequestToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch request token");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSession = createAsyncThunk(
  "auth/createSession",
  async (authorizedToken: string | null, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_token: authorizedToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

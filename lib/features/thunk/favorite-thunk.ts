import { createAsyncThunk } from "@reduxjs/toolkit";

type addToFavoritePayload = {
  movieId: number;
  userId: number | undefined;
  sessionId: string | null;
};

export const addToFavorite = createAsyncThunk(
  "favorite/addToFavorite",
  async (
    { movieId, userId, sessionId }: addToFavoritePayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.status_message || "Failed to add to favorite"
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  "favorite/removeFromFavorite",
  async (
    { movieId, userId, sessionId }: addToFavoritePayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: false,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.status_message || "Failed to remove from favorite"
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const getFavorite = createAsyncThunk(
  "favorite/getFavorite",
  async (
    {
      userId,
      sessionId,
    }: { userId: number | undefined; sessionId: string | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/favorite/movies?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.status_message || "Failed to fetch favorite"
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

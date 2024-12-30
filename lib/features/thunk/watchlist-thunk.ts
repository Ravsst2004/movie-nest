import { createAsyncThunk } from "@reduxjs/toolkit";

type AddToWatchlistPayload = {
  movieId: number;
  userId: number | undefined;
  sessionId: string | null;
};

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (
    { movieId, userId, sessionId }: AddToWatchlistPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            watchlist: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.status_message || "Failed to add to watchlist"
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

// TODO: Implement remove from watchlist
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (
    { movieId, userId, sessionId }: AddToWatchlistPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            watchlist: false,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.status_message || "Failed to remove from watchlist"
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

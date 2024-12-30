import { createSlice } from "@reduxjs/toolkit";
import { addToWatchlist } from "../thunk/watchlist-thunk";
import { DetailMovieType } from "@/types/detail-movie";

type WatchlistState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  movies: DetailMovieType[];
};

const initialState: WatchlistState = {
  loading: false,
  error: null,
  success: false,
  movies: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.movies.push(action.payload);
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default watchlistSlice.reducer;

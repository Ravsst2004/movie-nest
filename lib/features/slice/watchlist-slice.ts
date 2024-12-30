import { createSlice } from "@reduxjs/toolkit";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../thunk/watchlist-thunk";
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
  reducers: {
    setWatchlist: (state, action) => {
      state.movies = action.payload;
    },
  },
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
      })

      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      .addCase(getWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(getWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;

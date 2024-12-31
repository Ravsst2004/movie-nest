import { DetailMovieType } from "@/types/detail-movie";
import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorite,
  getFavorite,
  removeFromFavorite,
} from "../thunk/favorite-thunk";

type FavoriteState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  movies: DetailMovieType[];
};

const initialState: FavoriteState = {
  loading: false,
  error: null,
  success: false,
  movies: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.movies.push(action.payload);
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      .addCase(removeFromFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeFromFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
        console.log(state.movies);
      })
      .addCase(removeFromFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

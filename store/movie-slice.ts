import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  category: string;
  genreId: number | null;
  page: number;
  searchTerm: string;
}

const initialState: MovieState = {
  category: "",
  genreId: null,
  page: 1,
  searchTerm: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setGenreId: (state, action: PayloadAction<number | null>) => {
      state.genreId = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.genreId = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setGenreId, setPage, setSearch } =
  movieSlice.actions;

export default movieSlice.reducer;

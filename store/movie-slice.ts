import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  category: string;
  page: number;
  searchTerm: string;
}

const initialState: MovieState = {
  category: "popular",
  page: 1,
  searchTerm: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setPage, setSearch } = movieSlice.actions;

export default movieSlice.reducer;

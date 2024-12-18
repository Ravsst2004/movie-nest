import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  category: string;
}

const initialState: MovieState = {
  category: "popular",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = movieSlice.actions;

export default movieSlice.reducer;

import { authSlice } from "./slice/auth-slice";
import { tmdbApi } from "@/services/tmdb-api";
import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slice/movie-slice";
import { authApi } from "@/services/auth-api";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    movie: movieSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tmdbApi.middleware)
      .concat(authApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

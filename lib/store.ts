import { tmdbApi } from "@/services/tmdb-api";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/auth-api";
import { authSlice } from "@/lib/features/slice/auth-slice";
import { movieSlice } from "@/lib/features/slice/movie-slice";
import { watchlistSlice } from "./features/slice/watchlist-slice";
import { favoriteSlice } from "./features/slice/favorite-slice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    movie: movieSlice.reducer,
    auth: authSlice.reducer,
    watchlist: watchlistSlice.reducer,
    favorite: favoriteSlice.reducer,
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

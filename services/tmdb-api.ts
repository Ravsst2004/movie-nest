import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!tmdbApiKey) {
  throw new Error("TMDB API key is missing! Check your .env.local file.");
}

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ page, category, searchTerm }) => {
        if (searchTerm) {
          return `/search/movie?query=${searchTerm}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get by category
        if (category) {
          return `/movie/${category}?page=${page}&api_key=${tmdbApiKey}`;
        }

        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovieNowPlaying: builder.query({
      query: () => `/movie/now_playing?api_key=${tmdbApiKey}`,
    }),

    getMovieBySearch: builder.query({
      query: (search) => `/search/movie?query=${search}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieNowPlayingQuery,
  useGetMovieBySearchQuery,
} = tmdbApi;

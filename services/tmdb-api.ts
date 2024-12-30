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
      query: ({ page, category, genreId, searchTerm }) => {
        if (searchTerm) {
          return `/search/movie?query=${searchTerm}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (genreId) {
          return `discover/movie?with_genres=${genreId}&page=${page}&api_key=${tmdbApiKey}`;
        }

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

    getMovieGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    getMovieDetail: builder.query({
      query: ({ id }) =>
        `/movie/${id}?append_to_response=videos,credits,similar,reviews&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieNowPlayingQuery,
  useGetMovieBySearchQuery,
  useGetMovieGenresQuery,
  useGetMovieDetailQuery,
} = tmdbApi;

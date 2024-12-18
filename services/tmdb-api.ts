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
      query: ({ page, category }) => {
        if (category) {
          return `/movie/${category}?page=${page}&api_key=${tmdbApiKey}`;
        }

        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!tmdbApiKey) {
  throw new Error("TMDB API key is missing! Check your .env.local file.");
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => `/authentication/token/new?api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetTokenQuery } = authApi;

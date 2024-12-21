"use client";

import React, { useMemo } from "react";
import MovieCard from "@/components/movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import { RootState } from "@/store/store";
import { MovieResultType } from "@/types/movies";
import { useSelector } from "react-redux";
import PlayingNow from "@/components/playing-now";

const Home = () => {
  const category = useSelector((state: RootState) => state.movie.category);
  const { data: movies, isLoading } = useGetMoviesQuery({ page: 1, category });
  const moviesLength = movies?.results.length;

  const movieItems = useMemo(
    () =>
      movies?.results.map((movie: MovieResultType) => (
        <div
          key={movie.id}
          className="overflow-hidden rounded-lg shadow-md"
        >
          <MovieCard
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title={movie.title}
            voteAverage={movie.vote_average}
          />
        </div>
      )),
    [movies]
  );

  // TODO: Skeleton dint appear
  if (isLoading) {
    return (
      <section className="px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: moviesLength ?? 0 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-[200px] h-[300px] rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-2">
      <PlayingNow />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-10">
        {movieItems}
      </div>
    </section>
  );
};

export default Home;

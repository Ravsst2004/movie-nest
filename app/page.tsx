"use client";

import React, { useMemo } from "react";
import MovieCard from "@/components/movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import { RootState } from "@/store/store";
import { MovieResultType } from "@/types/movies";
import { useSelector } from "react-redux";

const Home = () => {
  const category = useSelector((state: RootState) => state.movie.category);
  const { data: movies, isLoading } = useGetMoviesQuery({ page: 1, category });

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

  // testing isLoading
  const skeletons = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, idx) => (
        <Skeleton
          key={`${idx}`}
          className="w-[100px] h-[20px] rounded-full"
        />
      )),
    []
  );

  return (
    <section className="px-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {isLoading ? skeletons : movieItems}
      </div>
    </section>
  );
};

export default Home;

"use client";

import { useMemo, useState } from "react";
import MovieCard from "@/components/movie-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import { RootState } from "@/store/store";
import { MovieResultType } from "@/types/movies";
import { useSelector } from "react-redux";
import PlayingNow from "@/components/playing-now";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const category = useSelector((state: RootState) => state.movie.category);
  const { data: movies, isLoading } = useGetMoviesQuery({ page, category });

  const movieItems = useMemo(
    () =>
      movies?.results?.map((movie: MovieResultType) => (
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
    [movies?.results]
  );

  const loading = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-[200px] h-[300px] rounded-lg"
        />
      )),
    []
  );

  return (
    <section className="px-2">
      <PlayingNow />

      <div
        id="movie-list"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 mt-10"
      >
        {isLoading ? loading : movieItems}
      </div>

      <div className="flex justify-start items-start mt-10 my-20 md:w-fit">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem onClick={() => setPage(page - 1)}>
                <PaginationPrevious href="#movie-list"></PaginationPrevious>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#movie-list">{page}</PaginationLink>
            </PaginationItem>
            {page < movies?.total_pages && (
              <PaginationItem onClick={() => setPage(page + 1)}>
                <PaginationNext href="#movie-list" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Home;

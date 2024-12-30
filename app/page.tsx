"use client";

import { useEffect, useMemo } from "react";
import MovieCard from "@/components/movie-card";
import { useGetMovieGenresQuery, useGetMoviesQuery } from "@/services/tmdb-api";
import { MovieResultType } from "@/types/movies";
import { useDispatch, useSelector } from "react-redux";
import PlayingNow from "@/components/playing-now";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "motion/react";
import { setPage, setSearch } from "@/lib/features/slice/movie-slice";
import { Input } from "@/components/ui/input";
import Loading from "./loading";
import { GenreType } from "@/types/genres";
import { RootState } from "@/lib/store";
import { setSessionId } from "@/lib/features/slice/auth-slice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { category, genreId, page, searchTerm } = useSelector(
    (state: RootState) => state.movie
  );
  const { data: movies, isLoading } = useGetMoviesQuery({
    page,
    category,
    genreId,
    searchTerm,
  });
  const { data: genres } = useGetMovieGenresQuery({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return dispatch(setSearch(""));
    console.log("search");

    setTimeout(() => {
      dispatch(setSearch(e.target.value));
    }, 300);
  };

  const ListTitle = useMemo(() => {
    if (!movies || !genreId) return category.split("_").join(" ") || "POPULAR";
    return genres?.genres?.find((genre: GenreType) => genre.id === genreId)
      ?.name;
  }, [movies, genreId, category, genres?.genres]);

  const movieItems = useMemo(() => {
    if (!movies) return <h1>No Movies Found</h1>;

    return movies.results.map((movie: MovieResultType, index: number) => {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.02 * index }}
          key={movie.id}
          className="overflow-hidden rounded-lg shadow-md"
        >
          <MovieCard
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title={movie.title}
            id={movie.id}
            voteAverage={movie.vote_average}
          />
        </motion.div>
      );
    });
  }, [movies]);

  if (isLoading) return <Loading />;

  return (
    <section className="px-2">
      <PlayingNow />

      <article className="mt-10 space-y-2">
        <div className="flex flex-wrap justify-between items-center">
          <h1
            id={`${ListTitle}`}
            className="uppercase text-3xl font-bold"
          >
            {ListTitle}
          </h1>
          <Input
            type="search"
            placeholder="Search Movie"
            className="w-80"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div
          id="movie-list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 "
        >
          {movieItems}
        </div>
      </article>

      <div className="flex justify-start items-start mt-10 my-20 md:w-fit">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem onClick={() => dispatch(setPage(page - 1))}>
                <PaginationPrevious href="#movie-list"></PaginationPrevious>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#movie-list">{page}</PaginationLink>
            </PaginationItem>
            {page < movies?.total_pages && (
              <PaginationItem onClick={() => dispatch(setPage(page + 1))}>
                <PaginationNext href="#movie-list" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default HomePage;

"use client";

import { useMemo } from "react";
import MovieCard from "@/components/movie-card";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import { RootState } from "@/store/store";
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
import { setPage, setSearch } from "@/store/movie-slice";
import { Input } from "@/components/ui/input";
import Loading from "./loading";

const Home = () => {
  const { category, page, searchTerm } = useSelector(
    (state: RootState) => state.movie
  );
  const { data: movies, isLoading } = useGetMoviesQuery({
    page,
    category,
    searchTerm,
  });
  const dispatch = useDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return dispatch(setSearch(""));
    console.log("search");

    setTimeout(() => {
      dispatch(setSearch(e.target.value));
    }, 300);
  };

  const movieItems = useMemo(() => {
    if (!movies) return <h1>No Movies Found</h1>;

    return movies.results.map((movie: MovieResultType, index: number) => (
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
          voteAverage={movie.vote_average}
        />
      </motion.div>
    ));
  }, [movies]);

  if (isLoading) return <Loading />;

  return (
    <section className="px-2">
      <PlayingNow />

      <article className="mt-10 space-y-2">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="uppercase text-3xl font-bold">
            {category.split("_").join(" ") || "Popular Movies"}
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

export default Home;

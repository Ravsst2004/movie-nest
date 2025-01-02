"use client";

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
} from "@/components/ui/pagination";
import { setPage, setSearch } from "@/lib/features/slice/movie-slice";
import { Input } from "@/components/ui/input";
import Loading from "./loading";
import { GenreType } from "@/types/genres";
import { RootState } from "@/lib/store";

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
    setTimeout(() => {
      dispatch(setSearch(e.target.value));
    }, 400);
  };

  const ListTitle =
    genres?.genres?.find((genre: GenreType) => genre.id === genreId)?.name ??
    category.split("_").join(" ") ??
    "POPULAR";

  const movieItems = movies ? (
    movies.results.map((movie: MovieResultType, index: number) => (
      <MovieCard
        key={index}
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        title={movie.title}
        id={movie.id}
      />
    ))
  ) : (
    <h1>No Movies Found</h1>
  );

  if (isLoading) return <Loading />;

  return (
    <section className="px-2">
      <PlayingNow />

      <article className="mt-10 space-y-2">
        <div className="flex flex-wrap justify-between items-center">
          <h1
            id={`${ListTitle}`}
            className="uppercase text-lg md:text-3xl font-bold"
          >
            {ListTitle}
          </h1>
          <Input
            type="search"
            placeholder="Search Movie"
            className="w-64 md:w-80"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div
          id="movie-list"
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6 "
        >
          {movieItems}
        </div>
      </article>

      <div className="flex justify-start items-start mt-10 my-20 md:w-fit">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem onClick={() => dispatch(setPage(page - 1))}>
                <PaginationLink
                  href="#movie-list"
                  aria-label="Previous page"
                >
                  &lt;
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#movie-list"
                aria-current="page"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            {page < movies?.total_pages && (
              <PaginationItem onClick={() => dispatch(setPage(page + 1))}>
                <PaginationLink
                  href="#movie-list"
                  aria-label="Next page"
                >
                  &gt;
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default HomePage;

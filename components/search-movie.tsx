import React from "react";
import { Input } from "./ui/input";
import { useGetMovieBySearchQuery } from "@/services/tmdb-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSearch } from "@/store/movie-slice";

const SearchMovie = () => {
  const { searchTerm: search } = useSelector((state: RootState) => state.movie);
  const { data, isLoading, isError } = useGetMovieBySearchQuery(
    { search },
    { skip: !search }
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Input
        type="search"
        placeholder="Search Movie"
        className="w-80"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      {data?.results?.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default SearchMovie;

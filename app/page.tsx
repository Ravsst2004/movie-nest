"use client";

import MovieCard from "@/components/movie-card";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import { MovieResultType } from "@/types/movies";

const Home = () => {
  const { data: movies } = useGetMoviesQuery({ page: 1 });
  console.log(movies);

  return (
    <section className="px-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies?.results.map((movie: MovieResultType) => (
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
        ))}
      </div>
    </section>
  );
};

export default Home;

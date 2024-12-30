import { createSlug } from "@/lib/utils/create-slug";
import { DetailMovieType } from "@/types/detail-movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WatchlistMovieList = ({
  watchlistMovies,
}: {
  watchlistMovies: DetailMovieType[];
}) => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-2">Watchlist</h1>
      {watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {watchlistMovies.map((movie, index) => {
            const slug = `${createSlug(movie.title).toLowerCase()}-${movie.id}`;
            return (
              <Link
                href={`/movie/${slug}`}
                key={index}
                className="p-2 bg-gray-800 rounded-lg shadow-md flex gap-2"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                  alt={movie.title}
                  width={150}
                  height={150}
                  className="rounded object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                  <p className="text-sm">{movie.overview.slice(0, 70)}...</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p>No movies in your watchlist yet.</p>
      )}
    </div>
  );
};

export default WatchlistMovieList;

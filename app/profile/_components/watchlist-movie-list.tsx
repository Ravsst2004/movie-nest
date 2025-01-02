import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getWatchlist,
  removeFromWatchlist,
} from "@/lib/features/thunk/watchlist-thunk";
import { AppDispatch, RootState } from "@/lib/store";
import { createSlug } from "@/lib/utils/create-slug";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WatchlistMovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);
  const { movies: watchlistMovies, loading } = useSelector(
    (state: RootState) => state.watchlist
  );

  useEffect(() => {
    if (user && sessionId) {
      dispatch(getWatchlist({ userId: user.id, sessionId }));
    }
  }, [dispatch, user, sessionId]);

  const handleWatchlist = async (movieId: number) => {
    if (!user || !sessionId) {
      return;
    }

    await dispatch(
      removeFromWatchlist({
        movieId,
        userId: user.id,
        sessionId,
      })
    ).unwrap();

    await dispatch(getWatchlist({ userId: user.id, sessionId }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Skeleton className="h-20"></Skeleton>
        <Skeleton className="h-20"></Skeleton>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 dark:text-white">Watchlist</h1>
      {watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {watchlistMovies.map((movie, index) => {
            const slug = `${createSlug(movie.title || "untitled-movie")}-${
              movie.id
            }`;
            return (
              <Link
                href={`/movie/${slug}`}
                key={index}
                className="flex p-2 bg-gray-800 rounded-lg shadow-md gap-2 w-full"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                  alt={movie.title || "untitled-movie"}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="rounded object-cover w-24 h-24"
                />
                <div className="p-2">
                  <h2 className="movie-title">{movie.title}</h2>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleWatchlist(movie.id);
                    }}
                    className="mt-2 text-xs md:text-sm"
                  >
                    Remove <Bookmark />
                  </Button>
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

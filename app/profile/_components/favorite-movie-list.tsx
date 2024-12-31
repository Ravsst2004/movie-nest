import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  getFavorite,
  removeFromFavorite,
} from "@/lib/features/thunk/favorite-thunk";
import { AppDispatch, RootState } from "@/lib/store";
import { createSlug } from "@/lib/utils/create-slug";
import { HeartIcon } from "lucide-react";

const FavoriteMovieList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorite.movies
  );

  useEffect(() => {
    if (user && sessionId) {
      dispatch(getFavorite({ userId: user.id, sessionId }));
    }
  }, [dispatch, user, sessionId]);

  const handleFavorite = async (movieId: number) => {
    if (!user || !sessionId) {
      return;
    }

    await dispatch(
      removeFromFavorite({ movieId, userId: user.id, sessionId })
    ).unwrap();

    await dispatch(getFavorite({ userId: user.id, sessionId }));
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-2">Favorite</h1>
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {favoriteMovies.map((movie, index) => {
            const slug = `${createSlug(movie.title || "untitled-movie")}-${
              movie.id
            }`;
            return (
              <Link
                href={`/movie/${slug}`}
                key={index}
                className="p-2 bg-gray-800 rounded-lg shadow-md gap-2 w-fit"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                  alt={movie.title || "Untitled Movie"}
                  width={400}
                  height={400}
                  priority
                  className="rounded object-cover w-auto h-auto"
                />
                <div className="p-2">
                  <h2 className="text-xl font-semibold">
                    {movie.title || "Untitled Movie"}
                  </h2>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavorite(movie.id);
                    }}
                    className="mt-4"
                  >
                    Remove <HeartIcon />
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p>No movies in your favorite yet.</p>
      )}
    </div>
  );
};

export default FavoriteMovieList;

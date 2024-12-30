"use client";

import { setSessionId } from "@/lib/features/slice/auth-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { getWatchlist } from "@/lib/features/thunk/watchlist-thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "@/lib/features/thunk/favorite-thunk";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);
  const { movies: watchlistMovies } = useSelector(
    (state: RootState) => state.watchlist
  );
  const { movies: favoriteMovies } = useSelector(
    (state: RootState) => state.favorite
  );

  useEffect(() => {
    if (!sessionId) {
      dispatch(setSessionId(sessionStorage.getItem("sessionId") || ""));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (user && sessionId) {
      dispatch(getWatchlist({ userId: user.id, sessionId }));
    }
  }, [dispatch, user, sessionId]);

  useEffect(() => {
    if (user && sessionId) {
      dispatch(getFavorite({ userId: user.id, sessionId }));
    }
  }, [dispatch, user, sessionId]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <>
      <div className="text-white">
        <h1 className="text-2xl font-bold mb-4">
          {user.username}&apos;s Watchlist
        </h1>
        {watchlistMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlistMovies.map((movie, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
                <p className="text-sm">{movie.overview}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies in your watchlist yet.</p>
        )}
      </div>

      <div className="text-white">
        <h1 className="text-2xl font-bold mb-4">
          {user.username}&apos;s Watchlist
        </h1>
        {favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteMovies.map((movie, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
                <p className="text-sm">{movie.overview}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies in your watchlist yet.</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

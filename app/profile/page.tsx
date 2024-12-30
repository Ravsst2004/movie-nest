"use client";

import { setSessionId } from "@/lib/features/slice/auth-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { getWatchlist } from "@/lib/features/thunk/watchlist-thunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "@/lib/features/thunk/favorite-thunk";
import Image from "next/image";
import FavoriteMovieList from "./_components/favorite-movie-list";
import WatchlistMovieList from "./_components/watchlist-movie-list";

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
    <section className="px-2 flex flex-col lg:flex-row gap-2 w-full">
      <div className="lg:w-[10%]">
        <Image
          src={`https://gravatar.com/avatar/${user?.avatar?.gravatar?.hash}?s=400`}
          alt={user.username}
          width={100}
          height={100}
          className="rounded"
        />
        <h1 className="text-2xl font-bold">{user.username}</h1>
      </div>

      <div className="lg:w-[90%] space-y-6">
        <WatchlistMovieList watchlistMovies={watchlistMovies} />
        <FavoriteMovieList favoriteMovies={favoriteMovies} />
      </div>
    </section>
  );
};

export default ProfilePage;

"use client";

import { setSessionId } from "@/lib/features/slice/auth-slice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";

const FavoriteMovieList = dynamic(
  () => import("./_components/favorite-movie-list")
);
const WatchlistMovieList = dynamic(
  () => import("./_components/watchlist-movie-list")
);

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!sessionId) {
      dispatch(setSessionId(sessionStorage.getItem("sessionId") || ""));
    }
  }, [dispatch, sessionId]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <section className="px-2 gap-2 w-full">
      <div className="flex gap-2">
        <Image
          src={`https://gravatar.com/avatar/${user?.avatar?.gravatar?.hash}?s=400`}
          alt={user.username}
          width={80}
          height={80}
          className="rounded"
        />
        <h1 className="text-2xl font-bold">{user.username}</h1>
      </div>

      <div className="space-y-6 mt-10">
        <WatchlistMovieList />
        <FavoriteMovieList />
      </div>
    </section>
  );
};

export default ProfilePage;

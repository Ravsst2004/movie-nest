"use client";

import { setSessionId } from "@/lib/features/slice/auth-slice";
import { RootState } from "@/lib/store";
import { useGetWatchListMoviesQuery } from "@/services/tmdb-api";
import { DetailMovieType } from "@/types/detail-movie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!sessionId) {
      dispatch(setSessionId(sessionStorage.getItem("sessionId") || ""));
    }
  }, [dispatch, sessionId]);

  const { data: watchListMovies } = useGetWatchListMoviesQuery(
    {
      userId: user?.id,
      sessionId,
    },
    {
      skip: !sessionId,
    }
  );

  useEffect(() => {
    if (!user || !sessionId) {
    }
  }, [router, sessionId, user]);

  return (
    <div>
      <h1>{user?.username}&apos;s Watchlist</h1>
      <div>
        {watchListMovies?.results?.map((movie: DetailMovieType) => {
          return (
            <div
              key={movie.id}
              className="text-white"
            >
              {movie.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;

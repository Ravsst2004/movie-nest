"use client";

import { useGetMovieDetailQuery } from "@/services/tmdb-api";
import { useParams } from "next/navigation";
import React from "react";

const DetailMovie = () => {
  const { id: movieId } = useParams();

  const { data } = useGetMovieDetailQuery({ id: movieId });

  console.log(data);

  return <div className="px-2">Movie Detail</div>;
};

export default DetailMovie;

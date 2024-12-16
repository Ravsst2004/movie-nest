"use client";

import { Card } from "@/components/ui/card";
import { useGetMoviesQuery } from "@/services/tmdb-api";
import React from "react";

const Home = () => {
  const { data: movies } = useGetMoviesQuery({ page: 1 });
  console.log(movies);

  return (
    <section className="flex flex-col h-full w-full px-2">
      <Card className="flex-grow">
        <h1>Home</h1>
      </Card>
    </section>
  );
};

export default Home;

"use client";

import { useGetMovieDetailQuery } from "@/services/tmdb-api";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { fadeIn } from "@/motion/fade-variants";
import Image from "next/image";
import OtherDetailInformation from "./_components/other-detail-information";
import Loading from "@/app/loading";

const DetailMovie = () => {
  const { slug } = useParams();
  const movieId = slug?.toString().split("-").pop();
  const { data: movie, isLoading } = useGetMovieDetailQuery({ id: movieId });

  if (isLoading) return <Loading />;

  return (
    <section className="px-2">
      <div className="relative w-full h-full ">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45 rounded-md"></div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie.title}
          width={1300}
          height={50}
          className="w-auto h-auto md:w-full lg:h-[54rem] object-cover rounded-lg"
          priority
        />
        <div className="absolute bottom-0 left-0 p-4 lg:p-8 text-white z-10 space-y-2">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="text-3xl lg:text-5xl xl:text-7xl font-bold"
          >
            {movie.title}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:block text-xs md:text-sm lg:text-base xl:text-lg md:max-w-[70%]"
          >
            {movie.overview}
          </motion.p>

          <div className="hidden lg:block">
            <OtherDetailInformation movie={movie} />
          </div>
          {/* TODO: Add button for trailer movie*/}
        </div>
      </div>

      <div className="lg:hidden">
        <OtherDetailInformation movie={movie} />
      </div>
    </section>
  );
};

export default DetailMovie;

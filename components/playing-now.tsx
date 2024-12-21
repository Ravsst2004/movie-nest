import { useGetMovieNowPlayingQuery } from "@/services/tmdb-api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MovieResultType } from "@/types/movies";
import Link from "next/link";
import { motion } from "motion/react";

const PlayingNow = () => {
  const { data: nowPlaying } = useGetMovieNowPlayingQuery({});
  console.log(nowPlaying);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {nowPlaying?.results.map((movie: MovieResultType) => (
            <CarouselItem key={movie.id}>
              <Link
                href={`/movie/${movie.title}`}
                className="relative "
              >
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
                    <motion.h1 className="text-xl md:text-3xl lg:text-8xl font-bold">
                      {movie.title}
                    </motion.h1>
                    <p className="text-xs md:text-sm lg:text-xl md:max-w-[70%]">
                      {movie.overview}
                    </p>
                    <h3 className="text-xs md:text-sm lg:text-xl bg-white text-black px-2 py-1 rounded-md w-fit">
                      In Theaters Now
                    </h3>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </>
  );
};

export default PlayingNow;

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
import { fadeIn } from "@/motion/fade-variants";
import Autoplay from "embla-carousel-autoplay";

const PlayingNow = () => {
  const { data: nowPlaying } = useGetMovieNowPlayingQuery({});

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
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
                    <motion.h1
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.7 }}
                      className="text-xl md:text-3xl lg:text-5xl xl:text-7xl font-bold"
                    >
                      {movie.title}
                    </motion.h1>
                    <motion.p
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="text-xs md:text-sm lg:text-base xl:text-lg md:max-w-[70%]"
                    >
                      {movie.overview}
                    </motion.p>
                    <motion.h3
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.7, delay: 0.5 }}
                      className="text-xs md:text-sm bg-white text-black px-2 py-1 rounded-md w-fit"
                    >
                      In Theaters Now
                    </motion.h3>
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

import { Rating } from "@mui/material";
import TextInformation from "./text-information";
import { DetailMovieType } from "@/types/detail-movie";
import { SpokenLanguages } from "@/types/spoken-languages";
import DrawerInformation from "./drawer-information";
import { Button, buttonVariants } from "@/components/ui/button";
import { Bookmark, Film, Heart, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OtherDetailInformation = ({ movie }: { movie: DetailMovieType }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleOpenTrailer = () => setIsTrailerOpen(true);

  const firstBlock = (
    <div className="md:w-fit space-y-2">
      <div className="space-y-2 h-full w-full bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 ">
        <h1 className="text-xl font-semibold md:hidden">{movie.title}</h1>
        <p className="md:hidden text-xs md:text-sm lg:text-base xl:text-lg md:max-w-[70%]">
          {movie.overview}
        </p>
        <div className="flex items-start gap-2">
          <span>{movie.release_date.slice(0, 4)}</span>
          <span>|</span>
          <span>{`${movie.runtime} minutes`}</span>
          <span>|</span>
          {true && <span className="text-red-600 font-semibold">18+</span>}
        </div>

        <Rating
          name="half-rating-read"
          value={movie.vote_average / 2}
          precision={0.5}
          readOnly
          sx={{ fontSize: "1.2rem" }}
        />

        <DrawerInformation movie={movie} />
      </div>
    </div>
  );

  const secondBlock = (
    <div className="md:w-[70%] bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 space-y-2">
      {movie.tagline && (
        <TextInformation label="Tagline">{movie.tagline}</TextInformation>
      )}
      <TextInformation label="Genre">
        {movie?.genres?.map((genre: { id: number; name: string }) => (
          <span key={genre.id}>{genre.name} </span>
        ))}
      </TextInformation>
      <TextInformation label="Audio">
        {movie.spoken_languages?.map((language: SpokenLanguages) => (
          <span key={language.name}>{language.name}</span>
        ))}
      </TextInformation>
    </div>
  );

  const thirdBlock = (
    <div className="md:w-fit bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 flex flex-wrap md:flex-col gap-2">
      <Button>
        Watchlist
        <Bookmark />
      </Button>
      <Button>
        Favorite
        <Heart />
      </Button>
      <Button asChild>
        <Link
          href={`https://www.imdb.com/title/${movie?.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          IMDB <Link2 />
        </Link>
      </Button>
      <Dialog>
        <DialogTrigger className={`${buttonVariants({ variant: "default" })}`}>
          Trailer <Film />
        </DialogTrigger>
        <DialogContent className="h-[30rem] md:w-[40rem]">
          <DialogHeader>
            <DialogTitle>Trailer of {movie.title}</DialogTitle>
            <DialogDescription className="h-full w-full">
              {movie?.videos?.results?.length > 0 ? (
                <iframe
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                  allow="autoPlay"
                  className="w-full h-full"
                />
              ) : null}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <article className="my-4 max-w-7xl md:max-w-full mx-auto">
      <div className="pt-2 w-full flex flex-col md:flex-row gap-2">
        {firstBlock}
        {secondBlock}
        {thirdBlock}
      </div>
    </article>
  );
};

export default OtherDetailInformation;

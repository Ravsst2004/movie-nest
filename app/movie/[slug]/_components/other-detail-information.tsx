import { Rating } from "@mui/material";
import TextInformation from "./text-information";
import { DetailMovieType } from "@/types/detail-movie";
import { SpokenLanguages } from "@/types/spoken-languages";
import DrawerInformation from "./drawer-information";
import { Button, buttonVariants } from "@/components/ui/button";
import { Film, Link2 } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "@/lib/features/thunk/watchlist-thunk";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/lib/features/thunk/favorite-thunk";

const OtherDetailInformation = ({ movie }: { movie: DetailMovieType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionId } = useSelector((state: RootState) => state.auth);
  const { movies: watchlistedMovies } = useSelector(
    (state: RootState) => state.watchlist
  );
  const { movies: favoriteMovies } = useSelector(
    (state: RootState) => state.favorite
  );

  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && sessionId) {
      dispatch(getWatchlist({ userId: user.id, sessionId }));
    }
  }, [dispatch, user, sessionId]);

  useEffect(() => {
    setIsWatchlisted(watchlistedMovies.some((item) => item.id === movie.id));
  }, [watchlistedMovies, movie.id]);

  useEffect(() => {
    setIsFavorite(favoriteMovies.some((item) => item.id === movie.id));
  }, [favoriteMovies, movie.id]);

  const handleAddWatchlist = async () => {
    if (!user || !sessionId) {
      return;
    }

    if (isWatchlisted) {
      await dispatch(
        removeFromWatchlist({
          movieId: movie.id,
          userId: user.id,
          sessionId,
        })
      ).unwrap();
    } else {
      await dispatch(
        addToWatchlist({
          movieId: movie.id,
          userId: user.id,
          sessionId,
        })
      ).unwrap();
    }

    setIsWatchlisted(!isWatchlisted);
  };

  const handleFavorite = async () => {
    if (!user || !sessionId) {
      return;
    }

    if (isFavorite) {
      await dispatch(
        removeFromFavorite({
          movieId: movie.id,
          userId: user.id,
          sessionId,
        })
      ).unwrap();
    } else {
      await dispatch(
        addToFavorite({
          movieId: movie.id,
          userId: user.id,
          sessionId,
        })
      ).unwrap();
    }

    setIsFavorite(!isFavorite);
  };

  const firstBlock = (
    <div className="lg:w-fit space-y-2">
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
    <div className="lg:w-fit xl:w-[70%] bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 space-y-2">
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
    <div className="lg:w-fit bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
      <Button onClick={handleAddWatchlist}>
        Watchlist
        {isWatchlisted ? <FaBookmark /> : <FaRegBookmark />}
      </Button>
      <Button onClick={handleFavorite}>
        Favorite
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
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
    <article className="my-4 max-w-7xl lg:max-w-full mx-auto">
      <div className="pt-2 w-full flex flex-col lg:flex-row gap-2">
        {firstBlock}
        {secondBlock}
        {thirdBlock}
      </div>
    </article>
  );
};

export default OtherDetailInformation;

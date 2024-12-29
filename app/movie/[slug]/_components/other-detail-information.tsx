import { Rating } from "@mui/material";
import TextInformation from "./text-information";
import { DetailMovieType } from "@/types/detail-movie";
import { SpokenLanguages } from "@/types/spoken-languages";
import DrawerInformation from "./drawer-information";

const OtherDetailInformation = ({ movie }: { movie: DetailMovieType }) => {
  return (
    <article className="my-4 max-w-7xl mx-auto">
      <div className="pt-2 w-full flex flex-col md:flex-row gap-2">
        <div className="h-full md:w-[40%] space-y-2">
          <div className="space-y-2 bg-zinc-600 dark:bg-zinc-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-zinc-100 p-4 ">
            <h1 className="text-xl font-semibold">{movie.title}</h1>
            <div className="flex items-start gap-2">
              <span>{movie.release_date.slice(0, 4)}</span>
              <span>|</span>
              <span>{`${movie.runtime} minutes`}</span>
              <span>|</span>
              {true && <span className="text-red-600">18+</span>}
            </div>

            <Rating
              name="half-rating-read"
              value={movie.vote_average / 2}
              precision={0.5}
              readOnly
              sx={{ fontSize: "1.2rem" }}
            />
          </div>

          <div className="flex flex-wrap gap-2 bg-zinc-600 dark:bg-zinc-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-zinc-100 p-4 ">
            <DrawerInformation movie={movie} />
          </div>
        </div>

        <div className="h-full md:w-[60%] bg-zinc-600 dark:bg-zinc-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-zinc-100 p-4 space-y-2">
          <TextInformation label="Tagline">{movie.tagline}</TextInformation>
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
      </div>
    </article>
  );
};

export default OtherDetailInformation;

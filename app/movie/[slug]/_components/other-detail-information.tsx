import { Rating } from "@mui/material";
import TextInformation from "./text-information";
import { DetailMovieType } from "@/types/detail-movie";
import { SpokenLanguages } from "@/types/spoken-languages";
import DrawerInformation from "./drawer-information";

const OtherDetailInformation = ({ movie }: { movie: DetailMovieType }) => {
  return (
    <article className="my-4 max-w-7xl md:max-w-full mx-auto">
      <div className="pt-2 w-full flex flex-col md:flex-row gap-2">
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
      </div>
    </article>
  );
};

export default OtherDetailInformation;

import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";

type MovieCardProps = {
  image: string;
  title: string;
  voteAverage: number;
};

const MovieCard = ({ image, title, voteAverage }: MovieCardProps) => {
  return (
    <Link
      href={`/movie/${title}`}
      passHref
      className="flex flex-col justify-center items-center"
    >
      <div className="relative w-fit">
        <Image
          src={image}
          alt={title}
          width={300}
          height={450}
          priority
          className="w-full h-[350px] object-cover rounded-lg"
        />
      </div>

      <h1 className="text-center font-semibold pt-2 z-10 relative">{title}</h1>

      <Rating
        name="half-rating-read"
        value={voteAverage / 2}
        precision={0.5}
        readOnly
        sx={{ fontSize: "1.2rem" }}
      />
    </Link>
  );
};

export default MovieCard;

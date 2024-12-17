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
      className="flex flex-col justify-center items-center"
    >
      <Image
        src={image}
        alt={title}
        width={300}
        height={450}
        priority
        className="w-full h-[300px] object-cover rounded-lg"
      />

      <h1 className="text-center font-semibold pt-2 z-10 relative">{title}</h1>
      <Rating
        name="half-rating-read"
        defaultValue={voteAverage / 2}
        precision={0.5}
        readOnly
        sx={{ fontSize: "1.2rem" }}
      />
    </Link>
  );
};

export default MovieCard;

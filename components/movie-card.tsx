import Image from "next/image";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { createSlug } from "@/lib/utils/create-slug";

type MovieCardProps = {
  image: string;
  title: string;
  id: number;
  voteAverage: number;
};

const MovieCard = ({ image, title, id, voteAverage }: MovieCardProps) => {
  const slug = `${createSlug(title).toLowerCase()}-${id}`;

  return (
    <Link
      href={`/movie/${slug}`}
      passHref
      className="flex flex-col justify-center items-center pb-4"
    >
      <div className="relative w-fit">
        <Image
          src={image}
          alt={title}
          width={300}
          height={450}
          priority
          className="w-full h-[300px] object-cover rounded-lg"
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

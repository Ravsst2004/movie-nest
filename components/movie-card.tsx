import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/lib/utils/create-slug";

type MovieCardProps = {
  image: string;
  title: string;
  id: number;
};

const MovieCard = ({ image, title, id }: MovieCardProps) => {
  const slug = `${createSlug(title).toLowerCase()}-${id}`;

  return (
    <Link
      href={`/movie/${slug}`}
      passHref
      className="flex flex-col justify-center items-center"
    >
      <div className="relative w-fit">
        <Image
          src={image}
          alt={`Poster of ${title}`}
          width={300}
          height={450}
          loading="lazy"
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
        />
      </div>

      <h1 className="text-center font-semibold pt-2 z-10 relative p-2">
        {title}
      </h1>
    </Link>
  );
};

export default MovieCard;

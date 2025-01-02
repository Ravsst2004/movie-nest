import Image from "next/image";
import Link from "next/link";

type MovieCardProps = {
  image: string;
  title: string;
  id: number;
};

const MovieCard = ({ image, title, id }: MovieCardProps) => {
  const slug = `${title.toLowerCase().replace(/\s+/g, "-")}-${id}`;

  return (
    <Link
      href={`/movie/${slug}`}
      passHref
    >
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={`${title} poster`}
          width={300}
          height={450}
          className="object-cover rounded-lg"
          loading="lazy"
        />
        <h1 className="text-center font-semibold">{title}</h1>
      </div>
    </Link>
  );
};

export default MovieCard;

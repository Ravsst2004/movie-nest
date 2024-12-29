import { CreditsType } from "./credits";
import { GenreType } from "./genres";
import { ProductionCompaniesType } from "./production-companies";
import { ReviewsType } from "./reviews";
import { Similiar } from "./similiar";

export type DetailMovieType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  credits: CreditsType;
  genres: GenreType[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesType[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  reviews: ReviewsType[];
  runtime: number;
  similiar: Similiar[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: {
    results: {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      official: boolean;
      published_at: string;
      site: string;
      size: number;
      type: string;
    }[];
  };
  vote_average: number;
  vote_count: number;
};

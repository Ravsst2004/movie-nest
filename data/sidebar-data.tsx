import { BsFilm } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineMovie } from "react-icons/md";
// import { GiPunchBlast } from "react-icons/gi";

export const CATEGORIES = [
  {
    id: 1,
    name: "Popular",
    apiName: "popular",
    icon: <BsFilm />,
  },
  {
    id: 2,
    name: "Top Rated",
    apiName: "top_rated",
    icon: <FaRegStar />,
  },
  {
    id: 3,
    name: "Upcoming",
    apiName: "upcoming",
    icon: <MdOutlineMovie />,
  },
];

// export const GENRES = [
//   {
//     id: 1,
//     name: "Action",
//     slug: "action",
//     icon: <GiPunchBlast />,
//   },
//   {
//     id: 2,
//   },
// ];

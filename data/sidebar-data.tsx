import { BsCameraReels, BsFilm } from "react-icons/bs";
import {
  FaRegCompass,
  FaRegHeart,
  FaRegStar,
  FaTheaterMasks,
  FaTv,
} from "react-icons/fa";
import {
  MdFamilyRestroom,
  MdOutlineMovie,
  MdOutlineScience,
} from "react-icons/md";
import {
  GiDoubleDragon,
  GiMusicalNotes,
  GiPistolGun,
  GiPunchBlast,
  GiSandsOfTime,
} from "react-icons/gi";
import { SiAlby } from "react-icons/si";
import { PiDetectiveBold, PiMaskHappy } from "react-icons/pi";
import { RiCactusLine, RiKnifeBloodLine, RiSwordLine } from "react-icons/ri";
import { IoSkullOutline } from "react-icons/io5";

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

export const GENRESICON = [
  { icon: <GiPunchBlast /> },
  { icon: <FaRegCompass /> },
  { icon: <SiAlby /> },
  { icon: <PiMaskHappy /> },
  { icon: <GiPistolGun /> },
  { icon: <BsCameraReels /> },
  { icon: <FaTheaterMasks /> },
  { icon: <MdFamilyRestroom /> },
  { icon: <GiDoubleDragon /> },
  { icon: <GiSandsOfTime /> },
  { icon: <RiKnifeBloodLine /> },
  { icon: <GiMusicalNotes /> },
  { icon: <PiDetectiveBold /> },
  { icon: <FaRegHeart /> },
  { icon: <MdOutlineScience /> },
  { icon: <FaTv /> },
  { icon: <IoSkullOutline /> },
  { icon: <RiSwordLine /> },
  { icon: <RiCactusLine /> },
];

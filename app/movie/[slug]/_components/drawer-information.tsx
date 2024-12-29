import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { buttonVariants } from "@/components/ui/button";
import { DetailMovieType } from "@/types/detail-movie";
import { CastType } from "@/types/cast";
import { CrewType } from "@/types/crew";

const DrawerInformation = ({ movie }: { movie: DetailMovieType }) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger className={`${buttonVariants({ variant: "outline" })}`}>
          Cast
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cast:</DrawerTitle>
            <DrawerDescription>
              {movie?.credits?.cast?.map((cast: CastType) => (
                <span key={cast.id}>{cast.name}, </span>
              ))}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger className={`${buttonVariants({ variant: "outline" })}`}>
          Crew
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Crew:</DrawerTitle>
            <DrawerDescription>
              {movie?.credits?.crew
                ?.reduce((uniqueCrew, crew) => {
                  if (!uniqueCrew.some((c) => c.id === crew.id)) {
                    uniqueCrew.push(crew);
                  }
                  return uniqueCrew;
                }, [] as CrewType[])
                .map((crew) => (
                  <span key={`${crew.id}-${crew.name}`}>{crew.name}, </span>
                ))}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger className={`${buttonVariants({ variant: "outline" })}`}>
          Production Companies
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Production Companies:</DrawerTitle>
            <DrawerDescription>
              {movie?.production_companies?.map((company) => (
                <span key={company.id}>{company.name}, </span>
              ))}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerInformation;

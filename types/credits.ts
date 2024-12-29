import { CastType } from "./cast";
import { CrewType } from "./crew";

export type CreditsType = {
  id: number;
  cast: CastType[];
  crew: CrewType[];
};

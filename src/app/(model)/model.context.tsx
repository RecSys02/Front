import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";

export type ModelContextValue = {
  firstResult: ModelResult | null;
  setFirstResult: Dispatch<SetStateAction<ModelResult | null>>;

  selectedPlaces: Place[];
  setSelectedPlaces: Dispatch<SetStateAction<Place[]>>;

  activePlaceId: number | null;
  setActivePlaceId: Dispatch<SetStateAction<number | null>>;

  routeResult: RouteResult | null;
  setRouteResult: Dispatch<SetStateAction<RouteResult | null>>;
};

export const ModelContext = createContext<ModelContextValue | undefined>(
  undefined
);

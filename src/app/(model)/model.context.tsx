import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ModelResult, Place, RouteResult } from "./model.type";

export type ModelContextValue = {
  modelResult: ModelResult | null;
  setModelResult: (result: ModelResult | null) => void;

  selectedPlaces: Place[];
  setSelectedPlaces: Dispatch<SetStateAction<Place[]>>;

  activePlaceId: number | null;
  setActivePlaceId: Dispatch<SetStateAction<number | null>>;

  routeResult: RouteResult | null;
  setRouteResult: Dispatch<SetStateAction<RouteResult | null>>;

  historyPlaces: Place[];
  setHistoryPlaces: Dispatch<SetStateAction<Place[]>>;
};

export const ModelContext = createContext<ModelContextValue | undefined>(
  undefined
);
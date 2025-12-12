import { createContext } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";

export type ModelContextValue = {
  firstResult: ModelResult | null;
  setFirstResult: (value: ModelResult | null) => void;

  selectedPlaces: Place[];
  setSelectedPlaces: (value: Place[]) => void;

  routeResult: RouteResult | null;
  setRouteResult: (value: RouteResult | null) => void;
};

export const ModelContext = createContext<ModelContextValue | undefined>(
  undefined
);

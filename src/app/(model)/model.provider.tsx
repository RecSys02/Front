import { useState, ReactNode } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";
import { ModelContext } from "./model.context";
import { MOCK_MODEL_RESULT } from "./spot/_components/model.mock";

type Props = {
  children: ReactNode;
};

const getInitialActivePlaceId = (r: ModelResult | null) => {
  if (!r) return null;
  return r.tourspots[0]?.id ?? r.restaurants[0]?.id ?? r.cafes[0]?.id ?? null;
};

export const ModelProvider = ({ children }: Props) => {
  const [firstResult, setFirstResult] = useState<ModelResult | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<number | null>(() =>
    getInitialActivePlaceId(MOCK_MODEL_RESULT)
  );

  return (
    <ModelContext.Provider
      value={{
        firstResult,
        setFirstResult,
        selectedPlaces,
        setSelectedPlaces,
        routeResult,
        setRouteResult,
        activePlaceId,
        setActivePlaceId,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

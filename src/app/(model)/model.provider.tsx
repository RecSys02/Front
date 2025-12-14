import { useState, ReactNode } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";
import { ModelContext } from "./model.context";
import { MOCK_MODEL_RESULT } from "./spot/_components/model.mock";

type Props = {
  children: ReactNode;
};

export const ModelProvider = ({ children }: Props) => {
  const [firstResult, setFirstResult] = useState<ModelResult | null>(
    MOCK_MODEL_RESULT
  );
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(
    MOCK_MODEL_RESULT.places[0]?.id ?? null
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

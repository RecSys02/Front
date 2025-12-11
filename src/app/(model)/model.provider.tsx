import { useState, ReactNode } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";
import { ModelContext } from "./model.context";

type Props = {
  children: ReactNode;
};

export const ModelProvider = ({ children }: Props) => {
  const [firstResult, setFirstResult] = useState<ModelResult | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

  return (
    <ModelContext.Provider
      value={{
        firstResult,
        setFirstResult,
        selectedPlaces,
        setSelectedPlaces,
        routeResult,
        setRouteResult,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

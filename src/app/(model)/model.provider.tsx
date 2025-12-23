import { useState, ReactNode } from "react";
import { ModelResult, Place, RouteResult } from "./model.type";
import { ModelContext } from "./model.context";
import { ModelStore } from "@/stores/model.store";

type Props = {
  children: ReactNode;
};

export const ModelProvider = ({ children }: Props) => {
  const [modelResult, setModelResultState] = useState<ModelResult | null>(() =>
    ModelStore.actions.getModelResult()
  );
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<number | null>(null);

  const setModelResult = (result: ModelResult | null) => {
    if (result) ModelStore.actions.setModelResult(result);
    else ModelStore.actions.clear();

    setModelResultState(result);
  };

  return (
    <ModelContext.Provider
      value={{
        modelResult,
        setModelResult,
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

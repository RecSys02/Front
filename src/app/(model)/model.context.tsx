import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ModelResult, Place } from "./model.type";

export type ModelContextValue = {
  modelResult: ModelResult | null;
  setModelResult: (result: ModelResult | null) => void;

  selectedPlaces: Place[];
  setSelectedPlaces: Dispatch<SetStateAction<Place[]>>;

  activePlaceId: number | null;
  setActivePlaceId: Dispatch<SetStateAction<number | null>>;

  historyPlaces: Place[];
  setHistoryPlaces: Dispatch<SetStateAction<Place[]>>;

  resetSession: (opts?: { clearInput?: boolean }) => void;
};

export const ModelContext = createContext<ModelContextValue | undefined>(
  undefined
);

import { PlaceDto } from "@/types/place/place.type";
import { ModelResponseDto } from "@/types/model/model.type";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type ModelContextValue = {
  modelResult: ModelResponseDto | null;
  setModelResult: (result: ModelResponseDto | null) => void;

  selectedPlaces: PlaceDto[];
  setSelectedPlaces: Dispatch<SetStateAction<PlaceDto[]>>;

  activePlaceId: number | null;
  setActivePlaceId: Dispatch<SetStateAction<number | null>>;

  historyPlaces: PlaceDto[];
  setHistoryPlaces: Dispatch<SetStateAction<PlaceDto[]>>;

  resetSession: (opts?: { clearInput?: boolean }) => void;
};

export const ModelContext = createContext<ModelContextValue | undefined>(
  undefined
);

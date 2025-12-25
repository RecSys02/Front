import { useState } from "react";
import type { Place, ModelResult } from "./model.type";
import { ModelContext } from "./model.context";
import { ModelStore } from "@/stores/model.store";
import { ModelHistoryStore } from "@/stores/model-history.store";
import { ModelInputStore } from "@/stores/model-input.store";

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [modelResult, _setModelResult] = useState<ModelResult | null>(() =>
    ModelStore.actions.getModelResult()
  );

  const setModelResult = (result: ModelResult | null) => {
    _setModelResult(result);
    if (result) ModelStore.actions.setModelResult(result);
    else ModelStore.actions.clear();
  };

  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [activePlaceId, setActivePlaceId] = useState<number | null>(null);

  const [historyPlaces, _setHistoryPlaces] = useState<Place[]>(() =>
    ModelHistoryStore.actions.getHistoryPlaces()
  );

  const setHistoryPlaces: React.Dispatch<React.SetStateAction<Place[]>> = (
    next
  ) => {
    _setHistoryPlaces((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      ModelHistoryStore.actions.setHistoryPlaces(resolved);
      return resolved;
    });
  };

  const resetSession = (opts?: { clearInput?: boolean }) => {
    _setModelResult(null);
    setSelectedPlaces([]);
    setActivePlaceId(null);
    _setHistoryPlaces([]);

    ModelStore.actions.clear();
    ModelHistoryStore.actions.clearHistoryPlaces();

    if (opts?.clearInput) {
      ModelInputStore.actions.clearModelInput();
    }
  };

  return (
    <ModelContext.Provider
      value={{
        modelResult,
        setModelResult,
        selectedPlaces,
        setSelectedPlaces,
        activePlaceId,
        setActivePlaceId,
        historyPlaces,
        setHistoryPlaces,
        resetSession,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

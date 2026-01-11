import { PlaceDto } from "@/types/place/place.type";

const MODEL_HISTORY_KEY = "model_history_places";

export const ModelHistoryStore = {
  actions: {
    setHistoryPlaces: (places: PlaceDto[]) => {
      sessionStorage.setItem(MODEL_HISTORY_KEY, JSON.stringify(places));
    },

    getHistoryPlaces: (): PlaceDto[] => {
      const raw = sessionStorage.getItem(MODEL_HISTORY_KEY);
      if (!raw) return [];

      try {
        const parsed = JSON.parse(raw) as PlaceDto[];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    },

    hasHistoryPlaces: (): boolean => {
      return ModelHistoryStore.actions.getHistoryPlaces().length > 0;
    },

    clearHistoryPlaces: () => {
      sessionStorage.removeItem(MODEL_HISTORY_KEY);
    },

    appendHistoryPlaces: (prev: PlaceDto[], next: PlaceDto[]) => {
      const merged = [...prev, ...next];
      return Array.from(new Map(merged.map((p) => [p.id, p])).values());
    },
  },
};

import type { Place } from "@/app/(model)/model.type";

const MODEL_HISTORY_KEY = "model_history_places";

export const ModelHistoryStore = {
  actions: {
    setHistoryPlaces: (places: Place[]) => {
      sessionStorage.setItem(MODEL_HISTORY_KEY, JSON.stringify(places));
    },

    getHistoryPlaces: (): Place[] => {
      const raw = sessionStorage.getItem(MODEL_HISTORY_KEY);
      if (!raw) return [];

      try {
        const parsed = JSON.parse(raw) as Place[];
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

    appendHistoryPlaces: (prev: Place[], next: Place[]) => {
      const merged = [...prev, ...next];
      return Array.from(new Map(merged.map((p) => [p.id, p])).values());
    },
  },
};

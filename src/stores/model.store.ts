import { ModelResult } from "@/app/(model)/model.type";
import storage from "@/storage/storage";

const MODEL_RESULT_KEY = "model_result";

export const ModelStore = {
  actions: {
    hasResult: (): boolean => {
      return ModelStore.actions.getModelResult() !== null;
    },

    setModelResult: (result: ModelResult) => {
      storage.setItem(MODEL_RESULT_KEY, JSON.stringify(result));
    },

    getModelResult: (): ModelResult | null => {
      const raw = storage.getItem(MODEL_RESULT_KEY);
      if (!raw) return null;

      try {
        return JSON.parse(raw) as ModelResult;
      } catch {
        return null;
      }
    },

    clear: () => {
      storage.removeItem(MODEL_RESULT_KEY);
    },
  },
};

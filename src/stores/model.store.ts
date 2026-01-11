import { ModelResponseDto } from "@/app/(model)/model.type";
import storage from "@/storage/storage";

const MODEL_RESULT_KEY = "model_result";

export const ModelStore = {
  actions: {
    hasResult: (): boolean => {
      return ModelStore.actions.getModelResult() !== null;
    },

    setModelResult: (result: ModelResponseDto) => {
      storage.setItem(MODEL_RESULT_KEY, JSON.stringify(result));
    },

    getModelResult: (): ModelResponseDto | null => {
      const raw = storage.getItem(MODEL_RESULT_KEY);
      if (!raw) return null;

      try {
        return JSON.parse(raw) as ModelResponseDto;
      } catch {
        return null;
      }
    },

    clear: () => {
      storage.removeItem(MODEL_RESULT_KEY);
    },
  },
};

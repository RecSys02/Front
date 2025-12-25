import { ModelFormValues } from "@/app/(model)/context/_components/model-form.type";
import storage from "@/storage/storage";

const MODEL_INPUT_KEY = "model_input";

export const ModelInputStore = {
  actions: {
    setModelInput: (values: ModelFormValues) => {
      storage.setItem(MODEL_INPUT_KEY, JSON.stringify(values));
    },

    getModelInput: (): ModelFormValues | null => {
      const raw = storage.getItem(MODEL_INPUT_KEY);
      if (!raw) return null;

      try {
        return JSON.parse(raw) as ModelFormValues;
      } catch {
        return null;
      }
    },

    hasModelInput: (): boolean => {
      return ModelInputStore.actions.getModelInput() !== null;
    },

    clearModelInput: () => {
      storage.removeItem(MODEL_INPUT_KEY);
    },
  },
};

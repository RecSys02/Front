import { apiClient } from "@/apis/client/ts-rest/client";
import { MOCK_MODEL_RESULT } from "@/app/(model)/spot/_components/model.mock";
import { useMutation } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

type PlaceRef = {
  category: string;
  province: string;
  placeId: number;
};

type ModelArgs = {
  region: string;
  companion?: string[];
  budget: string;
  selectedPlaces?: PlaceRef[];
  historyPlaces?: PlaceRef[];
};
export const useModel = () => {
  return useMutation({
    mutationFn: async ({
      region,
      companion,
      budget,
      selectedPlaces,
      historyPlaces,
    }: ModelArgs) => {
      if (IS_MOCK) {
        await new Promise((r) => setTimeout(r, 500));
        return MOCK_MODEL_RESULT;
      }
      const res = await apiClient.model.generate.query({
        body: {
          region,
          companion,
          budget,
          selectedPlaces,
          historyPlaces,
        },
      });

      return res.body;
    },
  });
};

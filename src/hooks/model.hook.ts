import { tsr } from "@/apis/client/ts-rest/client";
import { MOCK_MODEL_RESULT } from "@/app/(model)/spot/_components/model.mock";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

type PlaceRef = {
  category: string;
  province: string;
  placeId: number;
};

export type ModelArgs = {
  region: string;
  companion?: string[];
  budget: string;
  selectedPlaces?: PlaceRef[];
  historyPlaces?: PlaceRef[];
};

export const useModel = () => {
  const onError = () => toast.error("추천 생성 중 오류가 발생했습니다.");

  const real = tsr.model.generate.useMutation({ onError });

  const mock = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return MOCK_MODEL_RESULT;
    },
    onError,
  });

  return IS_MOCK ? mock : real;
};

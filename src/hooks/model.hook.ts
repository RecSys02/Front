import { tsr } from "@/apis/client/ts-rest/client";
import { MOCK_MODEL_RESULT } from "@/app/(model)/spot/_components/model.mock";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ModelResponseDto, ModelRequestDto } from "@/types/model/model.type";
import { ApiOk } from "@/types/util.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useModel = () => {
  const onError = () => toast.error("추천 생성 중 오류가 발생했습니다.");

  const real = tsr.model.generate.useMutation({
    onError,
    select: (res: ApiOk<ModelResponseDto>) => res.body,
  });

  const mock = useMutation<ModelResponseDto, Error, { body: ModelRequestDto }>({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return MOCK_MODEL_RESULT as ModelResponseDto;
    },
    onError,
  });

  return IS_MOCK ? mock : real;
};

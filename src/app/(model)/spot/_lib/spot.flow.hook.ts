import { useEffect } from "react";
import { useCreatePlan } from "@/hooks/plan.hook";
import { useModel } from "@/hooks/model.hook";
import { toYYYYMMDD, resolveProvinceCode } from "@/libs/utils";
import { ModelInputStore } from "@/stores/model-input.store";
import type { PlaceDto } from "@/types/place/place.type";
import type { CreatePlanRequestDto } from "@/types/plan/plan.wrapper.type";
import type {
  ModelResponseDto,
  ModelRequestDto,
} from "@/types/model/model.type";
import { useNavigate } from "@tanstack/react-router";

export const useCreatePlanFromModel = (args: {
  historyPlaces: PlaceDto[];
  selectedPlaces: PlaceDto[];
}) => {
  const { historyPlaces, selectedPlaces } = args;
  const createPlan = useCreatePlan();

  const onCreatePlan = () => {
    if (createPlan.isPending) return;

    const input = ModelInputStore.actions.getModelInput();

    const startDate = toYYYYMMDD(input?.dateRange?.from ?? null);
    const endDate = toYYYYMMDD(input?.dateRange?.to ?? null);

    const provinceLabel = input?.region.province ?? null;
    const provinceCode = resolveProvinceCode(provinceLabel);

    if (!startDate || !endDate || !provinceLabel || !provinceCode) return;

    const merged = new Map<number, PlaceDto>();
    historyPlaces.forEach((p) => merged.set(p.id, p));
    selectedPlaces.forEach((p) => merged.set(p.id, p));

    const placesPayload = Array.from(merged.values()).map((p) => ({
      placeId: p.placeId,
      category: p.category,
      province: provinceCode,
    }));

    const createPlanPayload: CreatePlanRequestDto = {
      selectedPlaces: placesPayload,
      name: `${startDate} ${provinceLabel} 여행 계획`,
      startDate,
      endDate,
      province: provinceCode,
      isPrivate: true,
    };

    createPlan.mutate({ body: createPlanPayload });
  };

  return { createPlan, onCreatePlan };
};

export const useAutoModelResult = (args: {
  modelResult: ModelResponseDto | null;
  setModelResult: (dto: ModelResponseDto) => void;
}) => {
  const { modelResult, setModelResult } = args;
  const { mutate, isPending } = useModel();
  const navigate = useNavigate();

  useEffect(() => {
    if (modelResult) return;
    if (isPending) return;

    const input = ModelInputStore.actions.getModelInput();
    if (!input) return;

    const region = `${input.region.province} ${input.region.district}`.trim();

    const payload: ModelRequestDto = {
      region,
      companion: input.companion ?? undefined,
      budget: input.budget,
      accomAddress: input.address,
      selectedPlaces: [],
      historyPlaces: [],
    };

    mutate(
      { body: payload },
      {
        onSuccess: (res: any) => {
          const dto = (res?.body ?? res) as ModelResponseDto;
          setModelResult(dto);
        },
      },
    );
  }, [modelResult, isPending, setModelResult, mutate, navigate]);

  return { isPending };
};

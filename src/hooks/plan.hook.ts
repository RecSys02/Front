import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import {
  CreatePlanRequestDto,
  CreatePlanResponseDto,
  MyPlanListResponseDto,
} from "@/types/plan/plan.wrapper.type";
import { ApiOk } from "@/types/util.type";
import { MOCK_CREATE_PLAN, MOCK_PLAN, MOCK_POPULAR } from "./hook.mock";
import { Plan } from "@/types/plan/plan.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const usePopular = () => {
  const real = tsr.plan.popular.useQuery({
    queryKey: ["plan", "popular"],
    enabled: !IS_MOCK,
  });

  const mock = useQuery({
    queryKey: ["plan", "popular"],
    queryFn: async () => MOCK_POPULAR,
    enabled: IS_MOCK,
  });

  return IS_MOCK ? mock : real;
};

export const useCreatePlan = () => {
  const navigate = useNavigate();

  const navigateToPlan = (id: number) => {
    navigate({
      to: ROUTES.ModelPlan,
      params: { planId: String(id) },
    });
  };

  const real = tsr.plan.create.useMutation({
    onSuccess: (res: ApiOk<CreatePlanResponseDto>) => {
      navigateToPlan(res.body.id);
    },
  });

  const mock = useMutation<
    ApiOk<CreatePlanResponseDto>,
    Error,
    { body: CreatePlanRequestDto }
  >({
    mutationFn: async () => {
      return {
        status: 200,
        body: { id: 1 },
        headers: new Headers(),
      };
    },
    onSuccess: (res) => {
      navigateToPlan(res.body.id);
    },
  });

  return IS_MOCK ? mock : real;
};

export const useReadPlan = (planId: number | null): UseQueryResult<Plan> => {
  const key = ["plan", "read", planId] as const;

  const real = tsr.plan.read.useQuery({
    queryKey: key,
    params: { id: planId as number },
    enabled: !IS_MOCK && typeof planId === "number",
  });

  const mock = useQuery<Plan>({
    queryKey: key,
    enabled: IS_MOCK && typeof planId === "number",
    queryFn: async () => {
      return {
        id: planId as number,
        name: "성수 여행 계획",
        isPrivate: false,
        imgSrc: "",
        schedule: MOCK_CREATE_PLAN.schedule,
      };
    },
  });

  return IS_MOCK ? mock : real;
};

export type SearchFilterDTO = {
  from: string;
  to: string;
};
export const usePlanListByUser = (
  params?: SearchFilterDTO
): UseQueryResult<MyPlanListResponseDto> => {
  const key = [
    "plan",
    "read",
    params?.from ?? null,
    params?.to ?? null,
  ] as const;

  const real = tsr.plan.listByUser.useQuery({
    queryKey: key,
    query: params,
    enabled: !IS_MOCK,
  });

  const mock = useQuery<MyPlanListResponseDto>({
    queryKey: key,
    queryFn: async () => MOCK_PLAN,
    enabled: IS_MOCK,
  });
  return (IS_MOCK
    ? mock
    : real) as unknown as UseQueryResult<MyPlanListResponseDto>;
};

import { tsr } from "@/apis/client/ts-rest/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import {
  CreatePlanRequestDto,
  CreatePlanResponseDto,
  MyPlanListResponseDto,
  PlanListResponseDto,
} from "@/types/plan/plan.wrapper.type";
import { ApiOk } from "@/types/util.type";
import { MOCK_CREATE_PLAN, MOCK_PLAN, MOCK_POPULAR } from "./hook.mock";
import { Plan } from "@/types/plan/plan.type";
import { toast } from "sonner";
import { planKeys } from "./hook.keys";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export type SearchFilterDTO = {
  from: string;
  to: string;
};

const invalidateAllPlans = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: planKeys.all });
};

export const usePopular = () => {
  const key = planKeys.popular();

  const real = tsr.plan.popular.useQuery({
    queryKey: key,
    enabled: !IS_MOCK,
    select: (res: ApiOk<typeof MOCK_POPULAR>) => res.body,
  });

  const mock = useQuery({
    queryKey: key,
    queryFn: async () => MOCK_POPULAR,
    enabled: IS_MOCK,
  });

  return IS_MOCK ? mock : real;
};

export const useCreatePlan = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const navigateToPlan = (id: number) => {
    navigate({
      to: ROUTES.ModelPlan,
      params: { planId: String(id) },
      replace: true,
    });
  };

  const onError = () => {
    toast.error("여행 계획 생성에 실패했습니다. 다시 시도해 주세요.");
    navigate({ to: "/", replace: true });
  };

  const onSuccess = (res: ApiOk<CreatePlanResponseDto>) => {
    invalidateAllPlans(queryClient);
    navigateToPlan(res.body.id);
  };

  const real = tsr.plan.create.useMutation({
    onSuccess,
    onError,
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
    onSuccess,
    onError,
  });

  return IS_MOCK ? mock : real;
};

export const useReadPlan = (planId: number | null): UseQueryResult<Plan> => {
  const key = planKeys.detail(planId);
  const enabled = planId != null && Number.isFinite(planId);

  const real = tsr.plan.read.useQuery({
    queryKey: key,
    enabled: enabled && !IS_MOCK,
    queryData: {
      params: { planId: planId as number },
    },
    select: (res: ApiOk<Plan>) => res.body,
  });

  const mock = useQuery<Plan>({
    queryKey: key,
    enabled: enabled && IS_MOCK,
    queryFn: async () => {
      const popular =
        MOCK_POPULAR.find((p) => p.id === planId) ?? MOCK_POPULAR[0];
      const province =
        MOCK_CREATE_PLAN.schedule[0]?.activities[0]?.province ?? "";

      return {
        id: planId as number,
        name: popular.name,
        province,
        isPrivate: false,
        image: popular.image,
        schedule: MOCK_CREATE_PLAN.schedule,
        isActive: popular.isActive,
        likeCount: popular.likeCount,
        userName: "MOCK_USER",
        tags: popular.tags,
      };
    },
  });

  return IS_MOCK ? mock : real;
};

export const usePlanListByUser = (
  params?: SearchFilterDTO,
): UseQueryResult<MyPlanListResponseDto> => {
  const key = planKeys.byUser(params);

  const real = tsr.plan.listByUser.useQuery({
    queryKey: key,
    query: params,
    enabled: !IS_MOCK,
    select: (res: ApiOk<MyPlanListResponseDto>) => res.body,
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

export const usePlanList = (
  params?: SearchFilterDTO,
): UseQueryResult<PlanListResponseDto> => {
  const key = planKeys.list(params);

  const real = tsr.plan.list.useQuery({
    queryKey: key,
    query: params,
    enabled: !IS_MOCK,
    select: (res: ApiOk<PlanListResponseDto>) => res.body,
  });

  const mock = useQuery<PlanListResponseDto>({
    queryKey: key,
    enabled: IS_MOCK,
    queryFn: async (): Promise<PlanListResponseDto> => {
      return Array.from({ length: 18 }).map((_, idx) => {
        const p = MOCK_POPULAR[idx % MOCK_POPULAR.length];
        return {
          id: idx + 1,
          name: `${p.name} ${idx + 1}`,
          isPrivate: false,
          isActive: false,
          province: "서울시",
          image: p.image,
          schedule: MOCK_CREATE_PLAN.schedule,
          tags: p.tags,
          likeCount: p.likeCount,
          userName: "MOCKUSER",
        };
      });
    },
  });

  return IS_MOCK ? mock : real;
};

export const useRemovePlan = (planId: number) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    invalidateAllPlans(queryClient);
    toast.success("여행 계획이 삭제되었습니다.");
  };

  const real = useMutation<ApiOk<void>, Error, void>({
    mutationFn: async () => {
      return tsr.plan.remove.mutation({
        params: { planId },
      });
    },
    onSuccess,
  });

  const mock = useMutation<ApiOk<void>, Error, void>({
    mutationFn: async (): Promise<ApiOk<void>> => ({
      status: 200,
      body: undefined,
      headers: new Headers(),
    }),
    onSuccess,
  });

  return IS_MOCK ? mock : real;
};

export const usePlanVisibility = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => invalidateAllPlans(queryClient);

  const real = tsr.plan.visibility.useMutation({ onSuccess });

  const mock = useMutation<
    ApiOk<void>,
    Error,
    {
      params: { planId: number };
      query: { isPrivate: boolean };
      body: undefined;
    }
  >({
    mutationFn: async (): Promise<ApiOk<void>> => ({
      status: 200,
      body: undefined,
      headers: new Headers(),
    }),
    onSuccess,
  });

  return IS_MOCK ? mock : real;
};

export type ToggleLikeProps = {
  planId: number;
  like: boolean;
};

export const useTogglePlanLike = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => invalidateAllPlans(queryClient);

  const real = useMutation<ApiOk<void>, Error, ToggleLikeProps>({
    mutationFn: async (props: ToggleLikeProps): Promise<ApiOk<void>> => {
      if (props.like) {
        return tsr.plan.like.mutation({
          params: { planId: props.planId },
          body: undefined,
        });
      }
      return tsr.plan.unlike.mutation({
        params: { planId: props.planId },
        body: undefined,
      });
    },
    onSuccess,
  });

  const mock = useMutation<ApiOk<void>, Error, ToggleLikeProps>({
    mutationFn: async (): Promise<ApiOk<void>> => ({
      status: 200,
      body: undefined,
      headers: new Headers(),
    }),
    onSuccess,
  });

  return IS_MOCK ? mock : real;
};

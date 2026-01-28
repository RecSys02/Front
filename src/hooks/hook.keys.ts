export type SearchFilterDTO = {
  from: string;
  to: string;
};

export type PlanListParams = { from?: string; to?: string };

export const PLAN_QK = {
  list: (params?: SearchFilterDTO) => ["plan", "list", params ?? null] as const,
  popular: () => ["plan", "popular"] as const,
  byUser: (params?: SearchFilterDTO) =>
    ["plan", "byUser", params ?? null] as const,
  detail: (planId: number) => ["plan", "detail", planId] as const,
};

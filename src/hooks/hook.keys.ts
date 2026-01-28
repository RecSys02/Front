export type SearchFilterDTO = { from: string; to: string };
export type PlanListParams = { from?: string; to?: string };

export const planKeys = {
  popular: () => ["plan", "popular"] as const,
  popularMock: () => ["plan", "mock", "popular"] as const,

  list: (params?: SearchFilterDTO) => ["plan", "list", params ?? null] as const,
  listMock: (params?: SearchFilterDTO) =>
    ["plan", "mock", "list", params ?? null] as const,

  byUser: (params?: SearchFilterDTO) =>
    ["plan", "byUser", params ?? null] as const,
  byUserMock: (params?: SearchFilterDTO) =>
    ["plan", "mock", "byUser", params ?? null] as const,

  detail: (planId: number | null) => ["plan", "detail", planId] as const,
  detailMock: (planId: number | null) =>
    ["plan", "mock", "detail", planId] as const,
};

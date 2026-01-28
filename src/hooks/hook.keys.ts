export type SearchFilterDTO = {
  from: string;
  to: string;
};

export type PlanListParams = { from?: string; to?: string };

export const planKeys = {
  all: ["plan"] as const,

  popularRoot: () => [...planKeys.all, "popular"] as const,
  popular: () => [...planKeys.popularRoot()] as const,

  listRoot: () => [...planKeys.all, "list"] as const,
  list: (params?: SearchFilterDTO) =>
    [...planKeys.listRoot(), params ?? null] as const,

  byUserRoot: () => [...planKeys.all, "byUser"] as const,
  byUser: (params?: SearchFilterDTO) =>
    [...planKeys.byUserRoot(), params ?? null] as const,

  detailRoot: () => [...planKeys.all, "detail"] as const,
  detail: (planId: number | null) =>
    [...planKeys.detailRoot(), planId] as const,
};

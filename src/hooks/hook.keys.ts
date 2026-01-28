export type PlanListParams = { from?: string; to?: string };

export const planKeys = {
  all: ["plan"] as const,

  popularRoot: () => ["plan", "popular"] as const,
  popular: () => ["plan", "popular"] as const,

  listRoot: () => ["plan", "list"] as const,
  list: (params?: { from: string; to: string }) =>
    ["plan", "list", params ?? null] as const,

  byUserRoot: () => ["plan", "byUser"] as const,
  byUser: (params?: { from: string; to: string }) =>
    ["plan", "byUser", params ?? null] as const,

  detailRoot: () => ["plan", "detail"] as const,
  detail: (planId: number | null) => ["plan", "detail", planId] as const,
};

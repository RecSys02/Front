export type PlanListParams = { from?: string; to?: string };

export const planKeys = {
  all: ["plans"] as const,

  popular: () => [...planKeys.all, "popular"] as const,

  list: (params?: PlanListParams) =>
    [
      ...planKeys.all,
      "list",
      { from: params?.from ?? null, to: params?.to ?? null },
    ] as const,

  byUser: (params?: PlanListParams) =>
    [
      ...planKeys.all,
      "byUser",
      { from: params?.from ?? null, to: params?.to ?? null },
    ] as const,

  detail: (planId: number | null) =>
    [...planKeys.all, "detail", planId] as const,
};

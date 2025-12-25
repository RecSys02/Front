export const PATH = {
  MODEL_BASE: "model",
  MODEL_CONTEXT: "context",
  MODEL_SPOT: "spot",
  MODEL_PLAN: "plan",
} as const;

const ROUTES = {
  Home: "/",
  Model: `/${PATH.MODEL_BASE}`,
  ModelContext: `/${PATH.MODEL_BASE}/${PATH.MODEL_CONTEXT}`,
  ModelSpot: `/${PATH.MODEL_BASE}/${PATH.MODEL_SPOT}`,
  ModelPlan: `/${PATH.MODEL_BASE}/${PATH.MODEL_PLAN}`,
  Hot: "/hot",
  Plans: "/plans",
  Register: "/register",
  Login: "/login",
  My: "/my",
};

export { ROUTES };

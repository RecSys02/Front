export const PATH = {
  MODEL_BASE: "model",
  MODEL_CONTEXT: "context",
  MODEL_SPOT: "spot",
  MODEL_PLAN: "plan/$planId",
} as const;

const ROUTES = {
  Home: "/",
  Model: `/${PATH.MODEL_BASE}`,
  ModelContext: `/${PATH.MODEL_BASE}/${PATH.MODEL_CONTEXT}`,
  ModelSpot: `/${PATH.MODEL_BASE}/${PATH.MODEL_SPOT}`,
  ModelPlan: `/${PATH.MODEL_BASE}/${PATH.MODEL_PLAN}`,
  Hot: "/hot",
  Plans: "/plans",
  PlanDetail: "/plans/$planId",
  Register: "/register",
  Login: "/login",
  OauthCallback: "/oauth",
  My: "/my",
};

export { ROUTES };

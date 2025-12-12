export const PATH = {
  MODEL_BASE: "model",
  MODEL_CONTEXT: "context",
  MODEL_SPOT: "spot",
  MODEL_RESULT: "result",
} as const;

const ROUTES = {
  Home: "/",
  Model: `/${PATH.MODEL_BASE}`,
  ModelContext: `/${PATH.MODEL_BASE}/${PATH.MODEL_CONTEXT}`,
  ModelSpot: `/${PATH.MODEL_BASE}/${PATH.MODEL_SPOT}`,
  ModelResult: `/${PATH.MODEL_BASE}/${PATH.MODEL_RESULT}`,
  Hot: "/hot",
  Plan: "/plan",
  Register: "/register",
  Login: "/login",
  My: "/my",
};

export { ROUTES };

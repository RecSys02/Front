export const PATH = {
  MODEL_BASE: "model",
  MODEL_PICK: "pick",
  MODEL_SPOT: "spot",
  MODEL_ROUTE: "route",
} as const;

const ROUTES = {
  Home: "/",
  Model: `/${PATH.MODEL_BASE}`,
  ModelPick: `/${PATH.MODEL_BASE}/${PATH.MODEL_PICK}`,
  ModelSpot: `/${PATH.MODEL_BASE}/${PATH.MODEL_SPOT}`,
  ModelRoute: `/${PATH.MODEL_BASE}/${PATH.MODEL_ROUTE}`,
  Hot: "/hot",
  Plan: "/plan",
  Register: "/register",
  Login: "/login",
  My: "/my",
};

export { ROUTES };

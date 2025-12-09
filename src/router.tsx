import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";
import Home from "./app/(home)/page";
import LoginPage from "./app/(auth)/login/page";
import RegisterPage from "./app/(auth)/register/page";
import Mypage from "./app/my/page";
import { PATH, ROUTES } from "./constants/routes";
import ModelLayout from "./app/(model)/model.layout";
import ModelContextPage from "./app/(model)/context/page";
import ModelSpotPage from "./app/(model)/spot/page";
import ModelPlanPage from "./app/(model)/plan/page";


const rootRoute = createRootRoute({ component: App });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Home,
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Login,
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Register,
  component: RegisterPage,
});

const myRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.My,
  component: Mypage,
});

const modelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Model,
  component: ModelLayout,
});

const modelContextRoute = createRoute({
  getParentRoute: () => modelRoute,
  path: PATH.MODEL_CONTEXT,
  component: ModelContextPage,
});

const modelSpotRoute = createRoute({
  getParentRoute: () => modelRoute,
  path: PATH.MODEL_SPOT,
  component: ModelSpotPage,
});

const modelPlanRoute = createRoute({
  getParentRoute: () => modelRoute,
  path: PATH.MODEL_PLAN,
  component: ModelPlanPage,
});

const modelTree = modelRoute.addChildren([
  modelContextRoute,
  modelSpotRoute,
  modelPlanRoute,
]);

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  myRoute,
  modelTree,
]);


export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

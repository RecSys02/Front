import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";
import Home from "./app/(home)/page";
import LoginPage from "./app/(auth)/login/page";
import RegisterPage from "./app/(auth)/register/page";
import { PATH, ROUTES } from "./constants/routes";
import ModelLayout from "./app/(model)/moel.layout";
import ModelPickPage from "./app/(model)/pick/page";

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

const modelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.Model,
  component: ModelLayout,
});

const modelPickRoute = createRoute({
  getParentRoute: () => modelRoute,
  path: PATH.MODEL_PICK,
  component: ModelPickPage,
});

// const modelSpotRoute = createRoute({
//   getParentRoute: () => modelRoute,
//   path: PATH.MODEL_SPOT,,
//   component: ModelSpotPage,
// });

// const modelRouteRoute = createRoute({
//   getParentRoute: () => modelRoute,
//   path: PATH.MODEL_ROUTE,
//   component: ModelRoutePage,
// });

const modelTree = modelRoute.addChildren([
  modelPickRoute,
  // modelSpotRoute,
  // modelRouteRoute,
]);

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  modelTree,
]);

export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

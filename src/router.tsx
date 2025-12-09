import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";
import Home from "./app/(home)/page";
import LoginPage from "./app/(auth)/login/page";
import RegisterPage from "./app/(auth)/register/page";
import { ROUTES } from "./constants/routes";

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
const routeTree = rootRoute.addChildren([homeRoute, loginRoute, registerRoute]);

export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

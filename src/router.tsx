import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";
import Home from "./app/(home)/page";
import LoginPage from "./app/(auth)/login/page";

const rootRoute = createRootRoute({ component: App });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([homeRoute, loginRoute]);

export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

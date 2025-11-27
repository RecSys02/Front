import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import App from "./app/App";

const rootRoute = createRootRoute();

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const routeTree = rootRoute.addChildren([appRoute]);

export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

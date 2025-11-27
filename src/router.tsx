import {
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";

const rootRoute = createRootRoute();

const routeTree = rootRoute.addChildren([]);

export const router = createRouter({ routeTree });
export type AppRouter = typeof router;

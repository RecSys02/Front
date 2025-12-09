import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const authApi = c.router(
  {
    signin: {
      method: "POST",
      path: "/token",
      body: z.object({
        userid: z.string(),
        password: z.string(),
        remember: z.boolean().optional(),
      }),
      responses: {
        200: z.object({
          accessToken: z.string(),
          name: z.string(),
          id: z.number(),
        }),
      },
    },
    signout: {
      method: "POST",
      path: "/logout",
      body: z.object({}).optional(),
      responses: {
        200: z.object({
          success: z.boolean(),
          message: z.string(),
        }),
      },
    },
    refresh: {
      method: "POST",
      path: "/refresh",
      body: z.object({}).optional(),
      responses: {
        200: z.object({
          accessToken: z.string(),
        }),
      },
    },
    checkId: {
      method: "POST",
      path: "/check",
      body: z.object({
        userid: z.string(),
      }),
      responses: {
        200: z.object({
          available: z.boolean(),
        }),
      },
    },
  },
  {
    pathPrefix: "/auth",
  }
);

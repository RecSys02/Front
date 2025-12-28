import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const authApi = c.router(
  {
    signin: {
      method: "POST",
      path: "/login",
      body: z.object({
        email: z.string(),
        password: z.string(),
        //remember: z.boolean().optional(),
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
    register: {
      method: "POST",
      path: "/join",
      body: z.object({
        password: z.string(),
        nickname: z.string(),
        email: z.string().optional(),
        tags: z.object({
          themes: z.array(z.string()).optional(),
          moods: z.array(z.string()).optional(),
          dislikes: z.array(z.string()).optional(),
          foods: z.array(z.string()).optional(),
          cafes: z.array(z.string()).optional(),
          activity: z.string().optional(),
        }),
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
        }),
      },
    },
  },
  {
    pathPrefix: "/auth",
  }
);

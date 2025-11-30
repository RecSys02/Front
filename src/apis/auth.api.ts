import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const authApi = c.router(
  {
    signin: {
      method: "POST",
      path: "/token",
      body: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.object({
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
  },
  {
    pathPrefix: "/auth",
  }
);

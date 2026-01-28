import {
  CreateUserSchema,
  AuthTokenResponseSchema,
  AvailabilityResponseSchema,
} from "@/types/auth/auth.type";
import { EmptySchema } from "@/types/util.type";
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
      }),
      responses: {
        200: AuthTokenResponseSchema,
      },
    },
    signout: {
      method: "POST",
      path: "/logout",
      body: EmptySchema,
      responses: {
        200: EmptySchema,
      },
    },
    reissue: {
      method: "POST",
      path: "/reissue",
      body: EmptySchema,
      responses: {
        200: AuthTokenResponseSchema,
      },
    },
    checkEmail: {
      method: "GET",
      path: "/check/email",
      query: z.object({
        email: z.string(),
      }),
      responses: {
        200: AvailabilityResponseSchema,
      },
    },
    checkName: {
      method: "GET",
      path: "/check/name",
      query: z.object({
        name: z.string(),
      }),
      responses: {
        200: AvailabilityResponseSchema,
      },
    },
    register: {
      method: "POST",
      path: "/join",
      body: CreateUserSchema,
      responses: {
        200: EmptySchema,
      },
    },
  },
  {
    pathPrefix: "/auth",
  },
);

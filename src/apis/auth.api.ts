import {
  CreateUserSchema,
  AuthTokenResponseSchema,
  AvailabilityResponseSchema,
  LoginResponseSchema,
} from "@/types/auth/auth.type";
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
        200: LoginResponseSchema,
      },
    },
    signout: {
      method: "POST",
      path: "/logout",
      body: z.object({}),
      responses: {
        200: z.void(),
      },
    },
    reissue: {
      method: "POST",
      path: "/reissue",
      body: z.object({}),
      responses: {
        200: AuthTokenResponseSchema,
      },
    },
    checkEmail: {
      method: "POST",
      path: "/check/email",
      body: z.object({
        email: z.string(),
      }),
      responses: {
        200: AvailabilityResponseSchema,
      },
    },
    checkName: {
      method: "POST",
      path: "/check/name",
      body: z.object({
        userName: z.string(),
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
        200: z.void(),
      },
    },
  },
  {
    pathPrefix: "/auth",
  }
);

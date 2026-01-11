import {
  CreatePlanRequestSchema,
  CreatePlanResponseSchema,
  MyPlanListResponseSchema,
  PopularPlanCardSchema,
} from "@/types/plan/plan.wrapper.type";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const planApi = c.router(
  {
    create: {
      method: "POST",
      path: "/",
      body: CreatePlanRequestSchema,
      responses: {
        200: CreatePlanResponseSchema,
      },
    },
    popular: {
      method: "GET",
      path: "/popular",
      responses: {
        200: z.array(PopularPlanCardSchema),
      },
    },
    listByUser: {
      method: "GET",
      path: "/user/me",
      query: z
        .object({
          from: z.string(),
          to: z.string(),
        })
        .optional(),
      responses: {
        200: MyPlanListResponseSchema,
      },
    },
  },
  {
    pathPrefix: "/plans",
  }
);

import { PlanSchema } from "@/types/plan/plan.type";
import {
  CreatePlanRequestSchema,
  CreatePlanResponseSchema,
  MyPlanListResponseSchema,
  PlanListResponseSchema,
  PopularPlanCardSchema,
} from "@/types/plan/plan.wrapper.type";
import { EmptySchema } from "@/types/util.type";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const planApi = c.router(
  {
    create: {
      method: "POST",
      path: "",
      body: CreatePlanRequestSchema,
      responses: {
        200: CreatePlanResponseSchema,
      },
    },
    read: {
      method: "GET",
      path: "/:planId",
      pathParams: z.object({
        planId: z.coerce.number(),
      }),
      responses: {
        200: PlanSchema,
      },
    },
    remove: {
      method: "DELETE",
      path: "/:planId",
      pathParams: z.object({
        planId: z.number(),
      }),
      responses: {
        200: EmptySchema,
      },
    },
    visibility: {
      method: "PATCH",
      path: "/:planId/privacy",
      pathParams: z.object({
        planId: z.number(),
      }),
      query: z.object({
        isPrivate: z.boolean(),
      }),
      body: z.undefined(),
      responses: {
        200: EmptySchema,
      },
    },
    like: {
      method: "POST",
      path: "/:planId/like",
      pathParams: z.object({
        planId: z.number(),
      }),
      body: EmptySchema,
      responses: {
        200: EmptySchema,
      },
    },
    unlike: {
      method: "DELETE",
      path: "/:planId/like",
      pathParams: z.object({
        planId: z.number(),
      }),
      body: EmptySchema,
      responses: {
        200: EmptySchema,
      },
    },
    popular: {
      method: "GET",
      path: "/popular",
      responses: {
        200: z.array(PopularPlanCardSchema),
      },
    },
    list: {
      method: "GET",
      path: "",
      query: z
        .object({
          from: z.string(),
          to: z.string(),
        })
        .optional(),
      responses: {
        200: PlanListResponseSchema,
      },
    },
    listByUser: {
      method: "GET",
      path: "/my",
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
    pathPrefix: "/api/plans",
  },
);

import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ActivitySchema = z.object({
  day: z.number(), 
  name: z.string(),
  start: z.string(),
  end: z.string(),
  category: z.string(),
});

export const planApi = c.router(
  {
    popular: {
      method: "GET",
      path: "/popular",
      responses: {
        200: z.array(
          z.object({
            title: z.string(),
            tags: z.array(z.string()),
            likes: z.number(),
            isActive: z.boolean(),
            imgSrc: z.string(),
          })
        ),
      },
    },
    plan: {
      method: "GET",
      path: "/plan",
      responses: {
        200: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            schedules: z.array(ActivitySchema),
              })
            ),
          },
    },
  },
  {
    pathPrefix: "/plan",
  }
);

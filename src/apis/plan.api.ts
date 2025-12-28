import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const activitySchema = z.object({
  name: z.string(),
  placeId: z.number(),
  category: z.string(),
  province: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const planApi = c.router(
  {
    create: {
      method: "POST",
      path: "/",
      body: z.object({
        from: z.string(),
        to: z.string(),
        places: z.array(
          z.object({
            placeId: z.number(),
            category: z.string(),
            province: z.string(),
          })
        ),
      }),
      responses: {
        200: z.object({
          schedule: z.array(
            z.object({
              date: z.string(),
              activities: z.array(activitySchema),
            })
          ),
        }),
      },
    },
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
      // query: z.object({
      //   from: z.string(), 
      //   to: z.string(), 
      // }),
      responses: {
        200: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            schedules: z.array(activitySchema),
              })
            ),
          },
    },
  },
  {
    pathPrefix: "/plan",
  }
);

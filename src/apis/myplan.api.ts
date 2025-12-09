import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ScheduleSchema = z.object({
  day: z.number(), 
  name: z.string(),
  start: z.string(),
  end: z.string(),
  category: z.string(),
});

export const myPlanApi = c.router(
  {
    planner: {
      method: "GET",
      path: "/planner",
      responses: {
        200: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            schedules: z.array(ScheduleSchema),
          })
        ),
      },
    },
  },
  {
    pathPrefix: "/myplan",
  }
);

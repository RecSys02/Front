import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

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
  },
  {
    pathPrefix: "/plan",
  }
);

import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const userApi = c.router(
  {
    me: {
      method: "GET",
      path: "/me",
      responses: {
        200: z.object({
          username: z.string(),
        }),
      },
    },
  },
  {
    pathPrefix: "/user",
  }
);

import { TagListSchema } from "@/types/tag/tag.type";
import { initContract } from "@ts-rest/core";

const c = initContract();

export const tagApi = c.router(
  {
    list: {
      method: "GET",
      path: "/",
      responses: {
        200: TagListSchema,
      },
    },
  },
  {
    pathPrefix: "/tags",
  }
);

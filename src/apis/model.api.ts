import {
  ModelRequestSchema,
  ModelResponseSchema,
} from "@/types/model/model.type";
import { initContract } from "@ts-rest/core";

const c = initContract();

export const modelApi = c.router(
  {
    generate: {
      method: "POST",
      path: "/",
      body: ModelRequestSchema,
      responses: {
        200: ModelResponseSchema,
      },
    },
  },
  {
    pathPrefix: "/api/recommend",
  },
);

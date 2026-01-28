import { PlaceSchema } from "@/types/place/place.type";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const placeApi = c.router(
  {
    read: {
      method: "GET",
      path: "/:placeId",
      pathParams: z.object({
        placeId: z.coerce.number(),
      }),
      query: z.object({
        category: z.string(),
        province: z.string(),
      }),
      responses: {
        200: PlaceSchema,
      },
    },
  },
  {
    pathPrefix: "/api/places",
  },
);

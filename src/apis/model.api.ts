import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const placeSchema = {
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  description: z.string(),
  duration: z.string(),
  images: z.array(z.string()).nullish(),
  keywords: z.array(z.string()).nullish(),
  category: z.string(),
  province: z.string(),
  placeId: z.number(),
};

export const modelApi = c.router(
  {
    generate: {
      method: "POST",
      path: "/generate",
      body: z.object({
        region: z.string(),
        companion: z.array(z.string()).nullish(),
        budget: z.string(),
        selectedPlaces: z
          .array(
            z.object({
              category: z.string(),
              province: z.string(),
              placeId: z.number(),
            })
          )
          .nullish(),
        historyPlaces: z
          .array(
            z.object({
              category: z.string(),
              province: z.string(),
              placeId: z.number(),
            })
          )
          .nullish(),
      }),
      responses: {
        200: z.object({
          tourspots: z.array(z.object(placeSchema)),
          restaurants: z.array(z.object(placeSchema)),
          cafes: z.array(z.object(placeSchema)),
        }),
      },
    },
  },
  {
    pathPrefix: "/model",
  }
);

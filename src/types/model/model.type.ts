import { z } from "zod";
import { PlaceIdSchema, PlaceSchema } from "../place/place.type";

export const ModelRequestSchema = z.object({
  region: z.string(),
  companion: z.array(z.string()).nullish(),
  budget: z.string(),
  selectedPlaces: z.array(PlaceIdSchema).nullish(),
  historyPlaces: z.array(PlaceIdSchema).nullish(),
  accomAddress: z.string().nullish(),
});
export type ModelRequestDto = z.infer<typeof ModelRequestSchema>;

export const ModelResponseSchema = z.object({
  tourspots: z.array(PlaceSchema),
  restaurants: z.array(PlaceSchema),
  cafes: z.array(PlaceSchema),
});
export type ModelResponseDto = z.infer<typeof ModelResponseSchema>;

import { z } from "zod";

export const PlaceSchema = z.object({
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
});
export type PlaceDto = z.infer<typeof PlaceSchema>;

export const PlaceIdSchema = PlaceSchema.pick({
  category: true,
  province: true,
  placeId: true,
});
export type PlaceIdDto = z.infer<typeof PlaceIdSchema>;

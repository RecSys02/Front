import { z } from "zod";
import { PlanSchema } from "./plan.type";
import { PlaceIdSchema } from "../place/place.type";

export const PlanSummarySchema = PlanSchema.pick({
  id: true,
  name: true,
  schedule: true,
});
export type PlanSummaryDto = z.infer<typeof PlanSummarySchema>;

//--------------------------------------------------------------------//

export const MyPlanListResponseSchema = z.array(PlanSummarySchema);
export type MyPlanListResponseDto = z.infer<typeof MyPlanListResponseSchema>;

//--------------------------------------------------------------------//

export const CreatePlanRequestSchema = z.object({
  selectedPlaces: z.array(PlaceIdSchema),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  province: z.string(),
  isPrivate: z.boolean(),
});
export type CreatePlanRequestDto = z.infer<typeof CreatePlanRequestSchema>;

export const CreatePlanResponseSchema = PlanSchema.pick({
  id: true,
});
export type CreatePlanResponseDto = z.infer<typeof CreatePlanResponseSchema>;

//--------------------------------------------------------------------//

export const PopularPlanCardSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
  likeCount: z.number(),
  isActive: z.boolean(),
  imgSrc: z.string(),
});
export type PopularPlanCardDto = z.infer<typeof PopularPlanCardSchema>;

//--------------------------------------------------------------------//

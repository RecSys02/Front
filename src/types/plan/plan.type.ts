import { z } from "zod";

export const ActivitySchema = z.object({
  name: z.string(),
  placeId: z.number(),
  category: z.string(),
  province: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const Dailyschedulechema = z.object({
  date: z.string(),
  activities: z.array(ActivitySchema),
});
export type DailySchedule = z.infer<typeof Dailyschedulechema>;

export const PlanSchema = z.object({
  id: z.number(),
  name: z.string(),
  isPrivate: z.boolean(),
  imgSrc: z.string(),
  schedule: z.array(Dailyschedulechema),
});
export type Plan = z.infer<typeof PlanSchema>;

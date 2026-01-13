import { z } from "zod";

export const TagCategorySchema = z.enum([
  "THEME",
  "MOOD",
  "FOOD",
  "CAFE",
  "DISLIKE",
  "ACTIVITY_LEVEL",
]);

export type TagCategory = z.infer<typeof TagCategorySchema>;

export const TagSchema = z.object({
  id: z.number(),
  category: TagCategorySchema,
  name: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;

export const TagListSchema = z.array(TagSchema);
export type TagList = z.infer<typeof TagListSchema>;

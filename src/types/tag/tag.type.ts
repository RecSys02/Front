import z from "zod";

export const TagSchema = z.object({
  id: z.number(),
  category: z.string(),
  name: z.string(),
});
export type Tag = z.infer<typeof TagSchema>;

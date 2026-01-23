import { z } from "zod";

export const RenameUserSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});
export type RenameUserDto = z.infer<typeof RenameUserSchema>;

export const UserMeSchema = z.object({
  userName: z.string(),
  image: z.string().nullish(),
});
export type UserMeDto = z.infer<typeof UserMeSchema>;

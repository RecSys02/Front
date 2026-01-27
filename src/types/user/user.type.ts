import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  userName: z.string(),
  image: z.string().nullable(),
  tagIds: z.array(z.number()).nullable(),
});
export type UserDto = z.infer<typeof UserSchema>;

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

export const UpdateUserTagSchema = z.object({
  preferredThemes: z.array(z.string()).nullable(),
  preferredMoods: z.array(z.string()).nullable(),
  preferredRestaurantTypes: z.array(z.string()).nullable(),
  preferredCafeTypes: z.array(z.string()).nullable(),
  avoid: z.array(z.string()).nullable(),
  activityLevel: z.string().nullable(),
});
export type UpdateUserTagDto = z.infer<typeof UpdateUserTagSchema>;

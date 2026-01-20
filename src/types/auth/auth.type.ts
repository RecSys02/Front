import { z } from "zod";

export const AuthTokenResponseSchema = z.object({
  accessToken: z.string(),
});
export type AuthTokenResponseDto = z.infer<typeof AuthTokenResponseSchema>;

//--------------------------------------------------------------------//

export const AvailabilityResponseSchema = z.object({
  available: z.boolean(),
});
export type AvailabilityResponse = z.infer<typeof AvailabilityResponseSchema>;

//--------------------------------------------------------------------//

export const LoginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = AuthTokenResponseSchema.extend({
  userName: z.string(),
});
export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;

//--------------------------------------------------------------------//

export const CreateUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  userName: z.string(),
  preferredThemes: z.array(z.string()).optional(),
  preferredMoods: z.array(z.string()).optional(),
  preferredRestaurantTypes: z.array(z.string()).optional(),
  preferredCafeTypes: z.array(z.string()).optional(),
  avoid: z.array(z.string()).optional(),
  activityLevel: z.string().optional(),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

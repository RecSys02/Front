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

//--------------------------------------------------------------------//

export const CreateUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  userName: z.string(),
  tagIds: z.array(z.number()).nullable(),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

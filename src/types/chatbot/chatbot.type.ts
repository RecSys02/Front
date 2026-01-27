import { z } from "zod";

export const ChatRoleSchema = z.enum(["user", "assistant"]);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

export const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string(),
  createdAt: z.string().optional(),
  isPending: z.boolean().optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

//--------------------------------------------------------------------//

export const ChatHistoryResponseSchema = z.object({
  messages: z.array(ChatMessageSchema),
});
export type ChatHistoryResponse = z.infer<typeof ChatHistoryResponseSchema>;

export const ChatSendRequestSchema = z.object({
  message: z.string().min(1),
});
export type ChatSendRequest = z.infer<typeof ChatSendRequestSchema>;

//--------------------------------------------------------------------//

export const ChatStreamTokenSchema = z.object({
  event: z.literal("token"),
  data: z.string(),
});
export type ChatStreamToken = z.infer<typeof ChatStreamTokenSchema>;

export const ChatStreamFinalSchema = z.object({
  event: z.literal("final"),
  data: z.string(),
});
export type ChatStreamFinal = z.infer<typeof ChatStreamFinalSchema>;

export const ChatStreamEventSchema = z.union([
  ChatStreamTokenSchema,
  ChatStreamFinalSchema,
]);
export type ChatStreamEvent = z.infer<typeof ChatStreamEventSchema>;

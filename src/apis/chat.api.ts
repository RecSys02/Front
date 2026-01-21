import { ChatMessageSchema } from "@/types/chatbot/chatbot.type";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const chatApi = c.router(
  {
    //just definition
    send: {
      method: "POST",
      path: "/send",
      body: z.object({
        message: z.string().min(1),
      }),
      responses: {
        200: z.any(),
      },
    },
    history: {
      method: "GET",
      path: "/history",
      responses: {
        200: z.object({
          messages: z.array(ChatMessageSchema),
        }),
      },
    },
  },
  { pathPrefix: "/chat" },
);

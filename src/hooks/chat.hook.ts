import { tsr } from "@/apis/client/ts-rest/client";
import { ChatHistoryResponse, ChatMessage } from "@/types/chatbot/chatbot.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_HISTORY: ChatHistoryResponse = {
  messages: [
    { role: "ASSISTANT", content: "안녕하세요. 무엇을 도와드릴까요?" },
  ],
};

export const useChatHistory = (
  enabled: boolean,
): UseQueryResult<ChatMessage[]> => {
  const key = ["chat", "history"] as const;

  const real = tsr.chat.history.useQuery({
    queryKey: key,
    enabled: enabled && !IS_MOCK,
  });

  const mock = useQuery<ChatMessage[]>({
    queryKey: key,
    enabled: enabled && IS_MOCK,
    queryFn: async () => MOCK_HISTORY.messages,
  });

  if (IS_MOCK) return mock;

  return {
    ...real,
    data: real.data?.body.messages,
  } as UseQueryResult<ChatMessage[]>;
};

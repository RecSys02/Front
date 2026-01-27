import { fetchChatHistory } from "@/apis/chat.sse";
import type { ChatMessage } from "@/types/chatbot/chatbot.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_HISTORY: ChatMessage[] = [
  { role: "assistant", content: "안녕하세요. 무엇을 도와드릴까요?" },
];

export const useChatHistory = (
  enabled: boolean,
): UseQueryResult<ChatMessage[]> => {
  const key = ["chat", "history"] as const;

  const real = useQuery<ChatMessage[]>({
    queryKey: key,
    enabled: enabled && !IS_MOCK,
    queryFn: async ({ signal }) => {
      return await fetchChatHistory(signal);
    },
  });

  const mock = useQuery<ChatMessage[]>({
    queryKey: ["chat", "mock", "history"] as const,
    enabled: enabled && IS_MOCK,
    queryFn: async () => MOCK_HISTORY,
  });

  return IS_MOCK ? mock : real;
};

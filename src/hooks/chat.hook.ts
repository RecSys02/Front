import { fetchChatHistory } from "@/apis/chat.sse";
import { ChatHistoryResponse, ChatMessage } from "@/types/chatbot/chatbot.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_HISTORY: ChatHistoryResponse = {
  messages: [
    { role: "assistant", content: "안녕하세요. 무엇을 도와드릴까요?" },
  ],
};
type HistoryApiResponse = ChatHistoryResponse | ChatMessage[];

export const useChatHistory = (
  enabled: boolean,
): UseQueryResult<ChatMessage[]> => {
  const key = ["chat", "history"] as const;

  const real = useQuery<ChatMessage[]>({
    queryKey: key,
    enabled: enabled && !IS_MOCK,
    queryFn: async ({ signal }) => {
      const data = (await fetchChatHistory(signal)) as HistoryApiResponse;
      if (Array.isArray(data)) return data;
      return data.messages ?? [];
    },
  });
  const mock = useQuery<ChatMessage[]>({
    queryKey: key,
    enabled: enabled && IS_MOCK,
    queryFn: async () => MOCK_HISTORY.messages as ChatMessage[],
  });

  return IS_MOCK ? mock : real;
};

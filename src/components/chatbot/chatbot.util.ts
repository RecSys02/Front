import type { ChatMessage } from "@/types/chatbot/chatbot.type";

export const appendUserAndEmptyAssistant = (
  prev: ChatMessage[],
  userContent: string,
): ChatMessage[] => [
  ...prev,
  { role: "USER", content: userContent },
  { role: "ASSISTANT", content: "", isPending: true },
];

export const appendTokenToLastAssistant = (
  prev: ChatMessage[],
  token: string,
): ChatMessage[] => {
  const next = [...prev];
  const lastIdx = next.length - 1;
  if (next[lastIdx]?.role !== "ASSISTANT") return prev;

  next[lastIdx] = {
    ...next[lastIdx],
    isPending: false,
    content: (next[lastIdx].content ?? "") + token,
  };
  return next;
};

export const setFinalToLastAssistant = (
  prev: ChatMessage[],
  finalText: string,
): ChatMessage[] => {
  const next = [...prev];
  const lastIdx = next.length - 1;
  if (next[lastIdx]?.role !== "ASSISTANT") return prev;

  next[lastIdx] = { ...next[lastIdx], isPending: false, content: finalText };
  return next;
};

export const setErrorToLastAssistant = (
  prev: ChatMessage[],
  message = "응답을 불러오지 못했습니다. 잠시 후 다시 시도하세요.",
): ChatMessage[] => {
  const next = [...prev];
  const lastIdx = next.length - 1;
  if (next[lastIdx]?.role !== "ASSISTANT") return prev;

  next[lastIdx] = { role: "ASSISTANT", content: message, isPending: false };
  return next;
};

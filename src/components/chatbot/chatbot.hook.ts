import { sendChatSse } from "@/apis/chat.sse";
import { ChatMessage } from "@/types/chatbot/chatbot.type";
import { useMemo, useRef, useState } from "react";
import {
  appendUserAndEmptyAssistant,
  appendTokenToLastAssistant,
  setFinalToLastAssistant,
  setErrorToLastAssistant,
} from "./chatbot.util";

type Props = {
  getText: () => string;
  setText: (v: string) => void;
  canSendBase: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export const useChatbotConversation = ({
  getText,
  setText,
  canSendBase,
  bottomRef,
}: Props) => {
  const abortRef = useRef<AbortController | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const canSend = useMemo(
    () => canSendBase && !isStreaming,
    [canSendBase, isStreaming],
  );

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  const abort = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  };

  const reset = () => {
    abort();
    setMessages([]);
    setText("");
  };

  const send = async () => {
    const content = getText().trim();
    if (!content) return;
    if (!canSend) return;

    abort();

    abortRef.current = new AbortController();

    setMessages((prev) => appendUserAndEmptyAssistant(prev, content));
    setText("");
    setIsStreaming(true);

    const onToken = (t: string) => {
      setMessages((prev) => appendTokenToLastAssistant(prev, t));
    };

    const onFinal = (finalText: string) => {
      setMessages((prev) => setFinalToLastAssistant(prev, finalText));
      setIsStreaming(false);
    };

    try {
      await sendChatSse({
        message: content,
        signal: abortRef.current.signal,
        onToken,
        onFinal,
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setIsStreaming(false);
        return;
      }
      setIsStreaming(false);
      setMessages((prev) => setErrorToLastAssistant(prev));
    }
  };

  return {
    messages,
    setMessages,
    isStreaming,
    canSend,
    send,
    abort,
    reset,
    scrollToBottom,
  };
};

export const useChatbotComposer = () => {
  const [text, setText] = useState("");

  const isSendEnabled = useMemo(() => text.trim().length > 0, [text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    send: () => void,
  ) => {
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;

    e.preventDefault();
    if (!isSendEnabled) return;

    send();
  };

  return {
    text,
    setText,
    isSendEnabled,
    handleInputChange,
    handleKeyDown,
  };
};

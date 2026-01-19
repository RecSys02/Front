import { useMemo, useState } from "react";

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

  const send = () => {
    // TODO: API/SSE
  };

  return {
    text,
    setText,
    isSendEnabled,
    handleInputChange,
    handleKeyDown,
    send,
  };
};

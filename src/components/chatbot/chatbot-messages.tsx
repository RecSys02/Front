import Column from "@/components/common/container/column";
import { ChatMessage } from "@/types/chatbot/chatbot.type";

type Props = {
  bottomRef: React.RefObject<HTMLDivElement | null>;
  messages: ChatMessage[];
  isLoading?: boolean;
};

const Dots = () => (
  <span className="inline-flex items-center gap-1">
    <span className="size-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.2s]" />
    <span className="size-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.1s]" />
    <span className="size-1.5 rounded-full bg-gray-400 animate-bounce" />
  </span>
);

const ChatbotMessages = ({ bottomRef, messages, isLoading }: Props) => {
  return (
    <Column className="chat-scroll flex-1 bg-white overflow-y-auto overflow-x-hidden px-4 py-3 space-y-3">
      {isLoading && messages.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-6">
          대화 이력을 불러오는 중...
        </div>
      ) : null}

      {messages.map((m, idx) => {
        const isUser = m.role === "user";
        const isPendingAssistant =
          m.role === "assistant" && m.isPending && (m.content ?? "") === "";

        return (
          <div
            key={idx}
            className={`
              max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap
              ${isUser ? "bg-emphasis text-white self-end ml-auto" : "bg-gray-100 text-gray-800 self-start"}
            `}
          >
            {isPendingAssistant ? <Dots /> : m.content}
          </div>
        );
      })}

      <div ref={bottomRef} />
    </Column>
  );
};

export default ChatbotMessages;

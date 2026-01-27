import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ChatbotHeader from "./chatbot-header";
import ChatbotMessages from "./chatbot-messages";
import ChatbotInputBar from "./chatbot-input-bar";
import { useChatHistory } from "@/hooks/chat.hook";
import { useChatbotComposer, useChatbotConversation } from "./chatbot.hook";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatbotDialog = ({ open, onOpenChange }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const didInitRef = useRef(false);

  const { text, setText, isSendEnabled, handleInputChange, handleKeyDown } =
    useChatbotComposer();

  const history = useChatHistory(open);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => setIsExpanded((v) => !v);

  const convo = useChatbotConversation({
    getText: () => text,
    setText,
    canSendBase: isSendEnabled,
    bottomRef,
  });

  useEffect(() => {
    if (!open) return;
    if (!history.data) return;

    console.log("[init] history.data.len =", history.data.length);
    console.log("[init] first =", history.data[0]);
    console.log("[init] last =", history.data[history.data.length - 1]);

    convo.setMessages(history.data);

    console.log("[init] setMessages called");
  }, [open, history.data, convo]);

  useEffect(() => {
    if (!open) return;
    console.log("[render] convo.messages.len =", convo.messages.length);
  }, [open, convo.messages.length]);
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      didInitRef.current = false;
      convo.abort();
      setIsExpanded(false);
    }
    onOpenChange(next);
  };

  useEffect(() => {
    if (!open) return;
    convo.scrollToBottom();
  }, [open, convo.messages.length, convo]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={false}>
      <DialogContent
        className={`
          fixed z-10000 w-90 ${isExpanded ? "h-180" : "h-140"} p-0 overflow-hidden
          inset-auto right-24! bottom-6! top-auto! left-auto!
          translate-x-0 translate-y-0 flex flex-col
        `}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <ChatbotHeader
          title="어슬렁 챗봇"
          onToggleExpand={handleToggleExpand}
        />

        <ChatbotMessages
          bottomRef={bottomRef}
          messages={convo.messages}
          isLoading={history.isLoading}
        />

        <ChatbotInputBar
          text={text}
          isSendEnabled={convo.canSend}
          onChangeText={handleInputChange}
          onKeyDown={(e) => handleKeyDown(e, convo.send)}
          onSend={convo.send}
          onScrollToBottom={() => convo.scrollToBottom()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;

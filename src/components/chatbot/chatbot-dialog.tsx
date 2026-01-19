import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { Button } from "@/components/common/button/button";
import { Input } from "@/components/ui/input";
import { HomeIcon, SendIcon } from "lucide-react";
import { useChatbotComposer } from "@/hooks/chatbot.hook";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatbotDialog = ({ open, onOpenChange }: Props) => {
  const { text, isSendEnabled, handleInputChange, handleKeyDown, send } =
    useChatbotComposer();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleSend = () => {
    if (!isSendEnabled) return;
    send();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className="
          fixed z-10000 w-90 h-140 p-0 overflow-hidden
          inset-auto right-24! bottom-6! top-auto! left-auto!
          translate-x-0 translate-y-0
          flex flex-col
        "
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="px-4 py-3 bg-[#9ECD87]/12 backdrop-blur border-b border-[#9ECD87]/25">
          <DialogTitle className="text-[14px] font-extrabold text-[#245B3A] text-center">
            AI 어슬렁봇
          </DialogTitle>
        </DialogHeader>

        <Column className="chat-scroll flex-1 bg-white overflow-y-auto overflow-x-hidden px-4 py-3 space-y-3">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div
              key={idx}
              className={`
            max-w-[80%] px-3 py-2 rounded-lg text-sm
            ${
              idx % 2 === 0
                ? "bg-gray-100 text-gray-800 self-start"
                : "bg-emphasis text-white self-end ml-auto"
            }
          `}
            >
              {idx % 2 === 0
                ? `사용자 질문 예시 ${idx + 1}`
                : `AI 응답 예시 ${idx + 1}번`}
            </div>
          ))}
          <div ref={bottomRef} />
        </Column>

        <Column className="border-t border-gray-200 bg-white px-3 py-2">
          <Row className="items-end gap-2">
            <Button
              type="button"
              onClick={scrollToBottom}
              className="size-9 p-0 bg-transparent shadow-none text-gray-500 hover:text-gray-800"
            >
              <HomeIcon className="size-5" />
            </Button>

            <div className="relative flex-1">
              <Input
                value={text}
                onChange={handleInputChange}
                onKeyDown={(e) => handleKeyDown(e, handleSend)}
                placeholder="질문을 입력하세요"
                className="
                  h-10 rounded-full pl-4 pr-12 bg-gray-50
                  text-sm shadow-none transition-none focus-visible:ring-0
                  focus-visible:ring-offset-0 focus-visible:border-[#9ECD87]
                "
              />

              <Button
                type="button"
                onClick={handleSend}
                disabled={!isSendEnabled}
                className={`
                  absolute right-2 top-1/2 -translate-y-1/2
                  size-7 rounded-full
                  flex items-center justify-center
                  transition-colors
                  ${
                    isSendEnabled
                      ? "bg-emphasis text-white hover:bg-emphasis/90"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
                  }
                `}
              >
                <SendIcon className="size-4" />
              </Button>
            </div>
          </Row>
        </Column>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;

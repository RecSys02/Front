import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { Button } from "@/components/common/button/button";
import { Input } from "@/components/ui/input";
import { HomeIcon, SendIcon } from "lucide-react";

type Props = {
  text: string;
  isSendEnabled: boolean;
  onChangeText: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onSend: () => void;
  onScrollToBottom: () => void;
};

const ChatbotInputBar = ({
  text,
  isSendEnabled,
  onChangeText,
  onKeyDown,
  onSend,
  onScrollToBottom,
}: Props) => {
  return (
    <Column className="bg-white border-t border-black/10 px-4 py-3">
      <Row className="items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onScrollToBottom}
          className="h-10 w-10 rounded-full hover:bg-black/5"
          aria-label="맨 아래로"
        >
          <HomeIcon className="size-5 text-[#245B3A]" />
        </Button>

        <div className="relative flex-1">
          <Input
            value={text}
            onChange={onChangeText}
            onKeyDown={onKeyDown}
            placeholder="질문을 입력하세요"
            className="h-10 rounded-full pl-4 pr-12 bg-gray-50 text-sm shadow-none transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#9ECD87]"
          />

          <Button
            type="button"
            onClick={onSend}
            disabled={!isSendEnabled}
            className={`
              absolute right-1 top-1 h-8 w-8 rounded-full p-0
              ${
                isSendEnabled
                  ? "bg-emphasis text-white hover:bg-emphasis/90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
              }
            `}
            aria-label="전송"
          >
            <SendIcon className="size-4" />
          </Button>
        </div>
      </Row>
    </Column>
  );
};

export default ChatbotInputBar;

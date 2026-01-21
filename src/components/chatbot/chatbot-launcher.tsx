import { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../common/button/button";
import ChatbotDialog from "./chatbot-dialog";
import ChatbotIcon from "@/assets/chatbot.svg?react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useUser } from "@/hooks/user.hook";

const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  if (!user.isSuccess) return null;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="fixed bottom-6 right-6 z-10000 h-14 w-14 rounded-full bg-white border border-[#9ECD87]/40 shadow-md hover:shadow-lg"
              aria-label="챗봇 열기"
            >
              {open ? (
                <XIcon className="size-6 text-[#245B3A]" />
              ) : (
                <ChatbotIcon className="size-10" />
              )}
            </Button>
          </TooltipTrigger>

          {!open && (
            <TooltipContent
              side="left"
              align="center"
              sideOffset={8}
              className="bg-white text-[#245B3A] border border-[#9ECD87]/40 shadow-md font-semibold before:hidden after:hidden"
            >
              챗봇 대화하기
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <ChatbotDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ChatbotLauncher;

import { useState } from "react";
import { XIcon } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { Button } from "../common/button/button";
import ChatbotDialog from "./chatbot-dialog";
import ChatbotIcon from "@/assets/chatbot.svg?react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);

  const user = useUser();
  if (!user.isSuccess) return null;
  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              aria-label={open ? "챗봇 닫기" : "챗봇 열기"}
              className="fixed bottom-6 right-6 z-9999 size-14 rounded-full shadow-lg bg-accent"
              onClick={toggle}
            >
              {open ? (
                <XIcon className="size-6 text-white" strokeWidth={3} />
              ) : (
                <ChatbotIcon className="size-12" />
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
      <ChatbotDialog onOpenChange={setOpen} open={open} />
    </>
  );
};

export default ChatbotLauncher;

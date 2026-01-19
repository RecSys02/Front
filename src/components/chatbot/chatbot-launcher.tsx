import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { Button } from "../common/button/button";
import ChatbotDialog from "./chatbot-dialog";

const ChatbotLauncher = () => {
  const [open, setOpen] = useState(false);

  const user = useUser();
  if (!user.isSuccess) return null;

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed bottom-6 right-6 z-9999 size-14 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatbotDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ChatbotLauncher;

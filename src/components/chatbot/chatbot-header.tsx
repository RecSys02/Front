import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/common/button/button";
import { Maximize2 } from "lucide-react";

type Props = {
  title: string;
  onHelpClick?: () => void;
  onToggleExpand?: () => void;
};

const ChatbotHeader = ({ title, onToggleExpand }: Props) => {
  return (
    <DialogHeader className="px-4 py-3 bg-linear-to-r from-[#2F6B4F] to-[#3A6F5A] border-b border-black/10">
      <div className="relative flex items-center justify-center">
        {/* <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-0 text-white/80 hover:text-white hover:bg-white/10"
          onClick={onHelpClick}
        >
          <CircleHelp className="size-5" />
        </Button> */}

        <DialogTitle className="text-[16px] font-extrabold text-white">
          {title}
        </DialogTitle>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 text-white/80 hover:text-white hover:bg-white/10"
          onClick={onToggleExpand}
        >
          <Maximize2 className="size-5" />
        </Button>
      </div>
    </DialogHeader>
  );
};

export default ChatbotHeader;

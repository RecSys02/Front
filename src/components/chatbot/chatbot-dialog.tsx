import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatbotDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className="
          fixed z-10000 w-90 h-140 p-0 overflow-hidden
          inset-auto right-24! bottom-6! top-auto! left-auto!
          translate-x-0 translate-y-0
          flex flex-col gap-0
        "
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader className="px-4 py-3 bg-[#9ECD87]/12 backdrop-blur  border-b border-[#9ECD87]/25">
          <DialogTitle className="text-[14px] font-extrabold text-[#245B3A] text-center">
            AI 어슬렁봇
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 bg-white" />
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;

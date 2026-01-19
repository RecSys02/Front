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
          fixed z-10000 w-90 h-140 p-0 overflow-hidden inset-auto right-24! bottom-6! top-auto left-auto translate-x-0 translate-y-0"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4 py-3">
          <DialogTitle className="text-base">어슬렁 챗봇</DialogTitle>
        </DialogHeader>

        <div className="h-full bg-background" />
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotDialog;

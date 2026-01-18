import type { ReactNode } from "react";
import { Button } from "../common/button/button";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogDescription,
  DialogTitle,
} from "./dialog";
import { cn } from "@/libs/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  ctaText?: string;
  noHeader?: boolean;
  noFooter?: boolean;
  noPadding?: boolean;
  enableOutsideClick?: boolean;
  isLoading?: boolean;
  cancelText?: string;
  onCtaClick?: () => void;
  onCancelClick?: () => void;
  contentClassName?: string;
};

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  content,
  ctaText,
  noFooter,
  noPadding,
  enableOutsideClick,
  isLoading,
  cancelText,
  onCtaClick,
  onCancelClick,
  contentClassName,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={
          !enableOutsideClick ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={cn(
          "flex flex-col overflow-hidden",
          noPadding ? "p-0" : undefined,
          contentClassName
        )}
      >
        <DialogHeader
          className={cn(
            "space-y-0 shrink-0",
            noPadding ? "p-6 pb-0" : undefined
          )}
        >
          <DialogTitle className="mb-5 text-center font-semibold text-subtitle2">
            {title}
          </DialogTitle>
        </DialogHeader>

        {description && (
          <DialogDescription asChild>
            <div
              className={cn(
                "flex-1 min-h-0 overflow-y-auto",
                noPadding ? "px-6 pb-6" : undefined
              )}
            >
              {description}
            </div>
          </DialogDescription>
        )}

        {content && (
          <div
            className={cn(
              "flex-1 min-h-0 overflow-y-auto",
              noPadding ? "px-6 pb-6" : undefined
            )}
          >
            {content}
          </div>
        )}

        {noFooter || (
          <DialogFooter
            className={cn("shrink-0", noPadding ? "px-6 pb-6" : undefined)}
          >
            {cancelText && (
              <Button variant="outline" onClick={onCancelClick}>
                {cancelText}
              </Button>
            )}
            <Button
              type="button"
              isLoading={isLoading}
              onClick={onCtaClick}
              className="bg-emphasis text-white!"
            >
              {ctaText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

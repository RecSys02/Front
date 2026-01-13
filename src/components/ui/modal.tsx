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
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={
          !enableOutsideClick ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={noPadding ? "p-0" : undefined}
      >
        <DialogHeader className="space-y-0">
          <DialogTitle className="mb-5 text-center font-semibold text-subtitle2">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription asChild>
              <div className="mt-0 whitespace-pre-wrap text-center font-medium text-body2">
                {description}
              </div>
            </DialogDescription>
          )}
        </DialogHeader>

        {content}

        {noFooter || (
          <DialogFooter>
            {cancelText && (
              <Button variant="outline" onClick={onCancelClick}>
                {cancelText}
              </Button>
            )}
            <Button
              type="submit"
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

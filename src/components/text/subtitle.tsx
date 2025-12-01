import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/libs/utils";

const subtitleVariants = cva("font-semibold fc-primary", {
  variants: {
    variant: {
      subtitle1: "text-subtitle1 md:subtitle-2",
      subtitle2: "text-subtitle2 md:subtitle-3",
      subtitle3: "text-subtitle3 md:subtitle-3",
    },
  },
  defaultVariants: {
    variant: "subtitle1",
  },
});

const Subtitle = ({
  children,
  className,
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "subtitle1" | "subtitle2" | "subtitle3";
}) => {
  return (
    <h3 className={cn(subtitleVariants({ variant }), className)}>{children}</h3>
  );
};

export default Subtitle;

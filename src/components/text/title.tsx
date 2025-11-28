import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/libs/utils";

const titleVariants = cva("font-bold text-primary", {
  variants: {
    variant: {
      title1: "text-title1 md:text-title2",
      title2: "text-title2 md:text-title2",
    },
  },
  defaultVariants: {
    variant: "title1",
  },
});

const Title = ({
  children,
  className,
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "title1" | "title2";
}) => {
  return (
    <h1 className={cn(titleVariants({ variant }), className)}>{children}</h1>
  );
};

export default Title;

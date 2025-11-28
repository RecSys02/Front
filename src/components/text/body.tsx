import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/libs/utils";

const bodyVariants = cva("font-normal text-primary", {
  variants: {
    variant: {
      body1: "text-body1 md:text-body2",
      body2: "text-body2 md:text-body2",
    },
  },
  defaultVariants: {
    variant: "body1",
  },
});

const Body = ({
  children,
  className,
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "body1" | "body2";
}) => {
  return (
    <span className={cn(bodyVariants({ variant }), className)}>{children}</span>
  );
};

export default Body;

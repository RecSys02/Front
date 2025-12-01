import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/libs/utils";

const bodyVariants = cva("font-normal fc-primary", {
  variants: {
    variant: {
      body1: "text-body1 md:text-body2",
      body2: "text-body2 md:text-body3",
      body3: "text-body3 md:text-body3",
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
  variant?: "body1" | "body2" | "body3";
}) => {
  return (
    <span className={cn(bodyVariants({ variant }), className)}>{children}</span>
  );
};

export default Body;

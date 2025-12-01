import { cva } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/libs/utils";

const headingVariants = cva("font-bold fc-primary", {
  variants: {
    variant: {
      heading1: "text-heading1 md:text-heading2",
      heading2: "text-heading2 md:text-heading2",
    },
  },
  defaultVariants: {
    variant: "heading1",
  },
});

const Heading = ({
  children,
  className,
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "heading1" | "heading2";
}) => {
  return (
    <h2 className={cn(headingVariants({ variant }), className)}>{children}</h2>
  );
};

export default Heading;

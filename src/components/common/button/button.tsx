import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/libs/utils";
import { buttonVariants } from "./button.style";

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || isLoading;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        isDisabled && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <Spinner className="h-4 w-4" /> : <>{children}</>}
    </Comp>
  );
}

export { Button };

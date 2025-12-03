import { cn } from "@/libs/utils";

type SurfaceProps = {
  as?: React.ElementType;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Surface({
  as: Comp = "div",
  bordered = false,
  className,
  children,
}: SurfaceProps) {
  return (
    <Comp className={cn(bordered && "border border-gray-200", className)}>
      {children}
    </Comp>
  );
}

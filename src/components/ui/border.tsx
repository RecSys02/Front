import { cn } from "@/libs/utils";

type Props = {
  className?: string;
  direction?: "horizontal" | "vertical";
};

export const Border = ({ className, direction = "horizontal" }: Props) => {
  return (
    <div
      className={cn(
        "bg-gray-200",
        direction === "vertical" ? "w-px self-stretch" : "w-full h-px",
        className
      )}
    />
  );
};

import { cn } from "@/libs/utils";

type Props = {
  className?: string;
};

export const Border = ({ className }: Props) => {
  return <div className={cn("bg-gray-200 w-full h-px", className)} />;
};

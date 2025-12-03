import { cn } from "@/libs/utils";

type Props = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: Props) {
  return (
    <div className={cn("relative w-40 h-px bg-gray-300", className)}>
      <div
        className="absolute left-0 top-0 h-px bg-gray-800 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

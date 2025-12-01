import { cn } from "@/libs/utils";

export function Pill({
  iconSrc,
  children,
  className,
}: {
  iconSrc?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-black px-3.5 py-1 rounded-bl-none",
        className
      )}
    >
      {iconSrc && <img src={iconSrc} className="w-4 h-4 object-contain" />}
      <span className="text-white leading-none">{children}</span>
    </span>
  );
}

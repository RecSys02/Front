import { cn } from "@/libs/utils";

type Props = {
  src: string;
  className?: string;
  fit?: "cover" | "contain";
};

export function ImageBox({ src, className, fit = "cover" }: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        className={cn(
          "absolute inset-0 w-full h-full",
          fit === "cover" && "object-cover",
          fit === "contain" && "object-contain"
        )}
      />
    </div>
  );
}

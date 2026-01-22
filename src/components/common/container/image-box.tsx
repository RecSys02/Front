import { useMemo, useState } from "react";
import { cn } from "@/libs/utils";
import Placeholder from "@/assets/banners/placeholder.png";

type Props = {
  src?: string | null;
  className?: string;
  fit?: "cover" | "contain";
};

export function ImageBox({ src, className, fit = "cover" }: Props) {
  const [failed, setFailed] = useState(false);

  const normalizedSrc = useMemo(() => {
    const s = typeof src === "string" ? src.trim() : "";
    return s.length > 0 ? s : null;
  }, [src]);

  const finalSrc = failed || !normalizedSrc ? Placeholder : normalizedSrc;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={finalSrc}
        onError={() => setFailed(true)}
        onLoad={() => setFailed(false)}
        className={cn(
          "absolute inset-0 w-full h-full",
          fit === "cover" && "object-cover",
          fit === "contain" && "object-contain",
        )}
        alt=""
      />
      <div className="absolute inset-0 bg-white/15" />
    </div>
  );
}

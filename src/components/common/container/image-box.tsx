import { useMemo, useState } from "react";
import { cn } from "@/libs/utils";
import DefaultPlaceholder from "@/assets/banners/placeholder.png";
import TourspotPlaceholder from "@/assets/placeholder/tourspot-placeholder.png";
import CafePlaceholder from "@/assets/placeholder/cafe-placeholder.png";
import RestaurantPlaceholder from "@/assets/placeholder/restaurant-placeholder.png";
import PlanPlaceholder from "@/assets/placeholder/plan-placeholder.png";

export type ImageCategory = "TOURSPOT" | "CAFE" | "RESTAURANT" | "PLAN";

type Props = {
  src?: string | null;
  className?: string;
  fit?: "cover" | "contain";
  category?: ImageCategory;
};

const CATEGORY_PLACEHOLDER: Record<ImageCategory, string> = {
  TOURSPOT: TourspotPlaceholder,
  CAFE: CafePlaceholder,
  RESTAURANT: RestaurantPlaceholder,
  PLAN: PlanPlaceholder,
};

export function ImageBox({ src, className, fit = "cover", category }: Props) {
  const [failed, setFailed] = useState(false);

  const normalizedSrc = useMemo(() => {
    const s = typeof src === "string" ? src.trim() : "";
    return s.length > 0 ? s : null;
  }, [src]);

  const placeholderSrc =
    (category && CATEGORY_PLACEHOLDER[category]) ?? DefaultPlaceholder;

  const finalSrc = failed || !normalizedSrc ? placeholderSrc : normalizedSrc;

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

import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { ChevronLeft, MapPin, X } from "lucide-react";
import Body from "@/components/text/body";
import { Button } from "@/components/common/button/button";
import { ImageBox } from "@/components/common/container/image-box";
import { Badge } from "@/components/ui/badge/badge";
import Placeholder from "@/assets/banners/placeholder.png";
import { cn } from "@/libs/utils";
import { PlaceDto } from "@/types/place/place.type";

type Props = {
  open: boolean;
  place: PlaceDto | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hideSelectButton?: boolean;
};

const SpotDetailOverlay = ({
  open,
  place,
  isSelected,
  onClose,
  onToggleSelect,
  onPrev,
  hasPrev,
  hideSelectButton,
}: Props) => {
  if (!place) return null;

  const handlePrev = () => {
    if (hasPrev && onPrev) {
      onPrev();
      return;
    }
    onClose();
  };

  return (
    <Column
      className={cn(
        "fixed inset-y-0 z-30 border-l bg-background",
        "w-(--detail-width) right-(--sidebar-width)",
        "transition-[transform,opacity] duration-300 ease-in-out",
        open
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-full opacity-0 pointer-events-none",
      )}
    >
      <Column className="relative w-full h-100 overflow-hidden">
        <ImageBox
          src={place.images ? place.images[0] : Placeholder}
          className="w-full h-full"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/35 to-transparent" />

        <Row className="absolute left-3 right-3 top-3 w-auto items-center justify-between">
          <Button
            type="button"
            onClick={handlePrev}
            className="h-9 w-9 grid place-items-center rounded-md bg-transparent p-0"
          >
            <ChevronLeft className="size-6 text-white" />
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-md bg-transparent p-0"
          >
            <X className="size-6 text-white" />
          </Button>
        </Row>
      </Column>

      <Column className="h-full overflow-y-auto p-4 gap-3">
        <Body variant="body1" className="font-semibold line-clamp-2">
          {place.name}
        </Body>

        {place.address && (
          <Row className="items-center gap-1">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <Body variant="body3" className="fc-gray-500 line-clamp-2">
              {place.address}
            </Body>
          </Row>
        )}

        {place.keywords && place.keywords.length > 0 && (
          <Row className="flex-wrap gap-1">
            {place.keywords.slice(0, 6).map((k) => (
              <Badge
                key={k}
                variant="secondary"
                className="px-2 py-0.5 text-[11px] font-normal"
              >
                #{k}
              </Badge>
            ))}
          </Row>
        )}

        {place.description && (
          <Body variant="body3" className="fc-gray-600 whitespace-pre-line">
            {place.description}
          </Body>
        )}

        {!hideSelectButton && (
          <Button
            className={cn(
              "mt-2 cursor-pointer",
              isSelected
                ? "bg-white border border-gray-200"
                : "bg-emphasis text-white",
            )}
            onClick={onToggleSelect}
          >
            {isSelected ? "해제" : "추가"}
          </Button>
        )}
      </Column>
    </Column>
  );
};

export default SpotDetailOverlay;

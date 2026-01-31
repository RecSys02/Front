import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import { cn } from "@/libs/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/common/button/button";
import Body from "@/components/text/body";
import { ImageBox, ImageCategory } from "@/components/common/container/image-box";
import { Badge } from "@/components/ui/badge/badge";
import { PlaceDto } from "@/types/place/place.type";

type Props = {
  place: PlaceDto;
  isActive: boolean;
  isSelected: boolean;
  onFocus: (id: number) => void;
};

const SpotSidebarItem = ({ place, isActive, isSelected, onFocus }: Props) => {
  return (
    <Button
      type="button"
      onClick={() => onFocus(place.id)}
      className={cn(
        "w-full rounded-none border-0 px-3 py-3 text-left transition h-30",
        "hover:bg-muted/50",
        isActive && "bg-surface"
      )}
    >
      <Row className="items-center gap-3">
        <ImageBox
          category={place.category as ImageCategory}
          src={place.images?.[0] ?? null}
          className="size-20 shrink-0 rounded-md object-cover"
        />

        <Column className="min-w-0 flex-1 gap-1">
          <Body variant="body2" className="font-semibold line-clamp-1">
            {place.name}
          </Body>

          {place.description && (
            <Body
              variant="body3"
              className="fc-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {place.description}
            </Body>
          )}

          {place.keywords && place.keywords.length > 0 && (
            <Row className="mt-1 gap-1 flex-wrap">
              {place.keywords.slice(0, 3).map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="px-2 py-0.5 text-[11px] font-normal"
                >
                  #{keyword}
                </Badge>
              ))}
            </Row>
          )}
        </Column>

        {isSelected && <Check className="h-5 w-5 shrink-0 text-green-600" />}
      </Row>
    </Button>
  );
};

export default SpotSidebarItem;

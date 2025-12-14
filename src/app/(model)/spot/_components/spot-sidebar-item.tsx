import Row from "@/components/common/container/row";
import type { Place } from "../../model.type";
import { cn } from "@/libs/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/common/button/button";
import Body from "@/components/text/body";
import Column from "@/components/common/container/column";

type Props = {
  place: Place;
  isActive: boolean;
  isSelected: boolean;
  onFocus: (id: string) => void;
};

const SpotSidebarItem = ({ place, isActive, isSelected, onFocus }: Props) => {
  return (
    <Button
      type="button"
      onClick={() => onFocus(place.id)}
      className={cn(
        "w-full rounded-lg border px-3 py-2 text-left transition h-30",
        isActive ? "bg-accent/30 border-accent" : "hover:bg-muted/50"
      )}
    >
      <Row className="items-center justify-between">
        <Column className="min-w-0">
          <Body variant="body3" className="font-medium line-clamp-1">
            {place.name}
          </Body>
        </Column>

        {isSelected && <Check className="h-5 w-5 text-green-600" />}
      </Row>
    </Button>
  );
};

export default SpotSidebarItem;

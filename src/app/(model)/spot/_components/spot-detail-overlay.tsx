import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { X } from "lucide-react";
import type { Place } from "../../model.type";
import Body from "@/components/text/body";
import { Button } from "@/components/common/button/button";

type Props = {
  open: boolean;
  place: Place | null;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: () => void;
};

const SpotDetailOverlay = ({
  open,
  place,
  isSelected,
  onClose,
  onToggleSelect,
}: Props) => {
  if (!open || !place) return null;

  return (
    <Column className="absolute inset-y-0 right-100 w-100 z-30 border-l bg-background backdrop-blur">
      <Row className="items-center justify-between border-b px-3 py-2">
        <Body variant="body2" className="font-semibold line-clamp-1 pt-2 pl-2">
          {place.name}
        </Body>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="상세 닫기"
        >
          <X className="h-4 w-4" />
        </Button>
      </Row>

      <Column className="h-full overflow-y-auto p-3 gap-3">
        <div>장소 디테일</div>

        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={onToggleSelect}
        >
          {isSelected ? "선택 해제" : "선택 추가"}
        </Button>
      </Column>
    </Column>
  );
};

export default SpotDetailOverlay;

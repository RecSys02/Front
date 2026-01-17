import { useMemo, useState } from "react";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import { PlanListItem } from "@/types/plan/plan.wrapper.type";
import PlaceSlide from "./place-slide";
import { usePrefetchPlaces } from "@/hooks/place.hook";

type Props = {
  content: PlanListItem;
};

const PlaceTab = ({ content }: Props) => {
  const placeIds = useMemo(() => {
    return Array.from(
      new Set(
        content.schedule
          .flatMap((d) => d.activities)
          .map((a) => a.placeId)
          .filter((v): v is number => Number.isFinite(v))
      )
    );
  }, [content.schedule]);

  usePrefetchPlaces(placeIds);

  const [index, setIndex] = useState(0);

  if (placeIds.length === 0) {
    return (
      <Column className="gap-3">
        <Body variant="body3" className="text-gray-600">
          선택된 장소가 없습니다.
        </Body>
      </Column>
    );
  }

  const safeIndex = Math.min(index, placeIds.length - 1);
  const activePlaceId = placeIds[safeIndex];

  return (
    <Column className="gap-3 h-full">
      <PlaceSlide
        placeId={activePlaceId}
        index={safeIndex}
        total={placeIds.length}
        hasPrev={safeIndex > 0}
        hasNext={safeIndex < placeIds.length - 1}
        onPrev={() => setIndex((i) => i - 1)}
        onNext={() => setIndex((i) => i + 1)}
      />
    </Column>
  );
};

export default PlaceTab;

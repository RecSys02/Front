import { useMemo, useState } from "react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Spinner } from "@/components/ui/spinner";
import { useReadPlan } from "@/hooks/plan.hook";
import { usePrefetchPlaces } from "@/hooks/place.hook";
import { useParams } from "@tanstack/react-router";
import PlaceSlide from "@/app/plans/_components/place-slide";

type PlaceRef = {
  placeId: number;
  category: string;
  province: string;
};

const ModelPlanPage = () => {
  const { planId } = useParams({ strict: false }) as { planId: string };
  const id = Number(planId);

  const {
    data: content,
    isLoading,
    isError,
  } = useReadPlan(Number.isFinite(id) ? id : null);

  const placeRefs = useMemo((): PlaceRef[] => {
    const schedule = content?.schedule ?? [];

    const refs = schedule.flatMap((d) =>
      d.activities.map((a) => ({
        placeId: a.placeId,
        category: a.category,
        province: a.province,
      })),
    );

    const map = new Map<string, PlaceRef>();
    refs.forEach((r) => {
      const k = `${r.placeId}:${r.category}:${r.province}`;
      if (!map.has(k)) map.set(k, r);
    });

    return Array.from(map.values());
  }, [content]);

  usePrefetchPlaces(placeRefs);

  const [activeIndex, setActiveIndex] = useState(0);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < placeRefs.length - 1;

  const handlePrev = () => {
    if (!hasPrev) return;
    setActiveIndex((p) => p - 1);
  };

  const handleNext = () => {
    if (!hasNext) return;
    setActiveIndex((p) => p + 1);
  };

  if (isLoading) {
    return (
      <Column className="w-full h-[70vh] items-center justify-center">
        <Spinner className="size-12" />
      </Column>
    );
  }

  if (isError || !content) {
    return (
      <Column className="w-full h-[60vh] items-center justify-center">
        <Body variant="body2" className="fc-gray-600">
          플랜 정보를 불러오지 못했습니다.
        </Body>
      </Column>
    );
  }

  const activePlace = placeRefs[activeIndex];

  return (
    <Column className="w-full">
      {placeRefs.length > 0 && activePlace ? (
        <Row className="w-full justify-center">
          <PlaceSlide
            placeId={activePlace.placeId}
            category={activePlace.category}
            province={activePlace.province}
            index={activeIndex}
            total={placeRefs.length}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </Row>
      ) : (
        <Column className="rounded-lg border p-6 items-center justify-center">
          <Body variant="body2" className="fc-gray-600">
            등록된 장소가 없습니다.
          </Body>
        </Column>
      )}
    </Column>
  );
};

export default ModelPlanPage;

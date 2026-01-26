import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Spinner } from "@/components/ui/spinner";
import { useReadPlan } from "@/hooks/plan.hook";
import { usePrefetchPlaces } from "@/hooks/place.hook";
import Title from "@/components/text/title";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/common/button/button";
import { cn } from "@/libs/utils";
import Subtitle from "@/components/text/subtitle";
import { Border } from "@/components/ui/border";
import Planner from "@/app/(my)/_components/myplan-section/item/planner";
import { ROUTES } from "@/constants/routes";
import PlaceSlide from "@/app/plans/_components/place-slide";

type NavKey = "place" | "schedule";

const ModelPlanPage = () => {
  const navigate = useNavigate();
  const { planId } = useParams({ strict: false }) as { planId: string };
  const id = Number(planId);

  const {
    data: content,
    isLoading,
    isError,
  } = useReadPlan(Number.isFinite(id) ? id : null);

  const placeIds = useMemo(() => {
    const schedule = content?.schedule ?? [];
    const ids = schedule.flatMap((d) => d.activities.map((a) => a.placeId));
    return Array.from(new Set(ids));
  }, [content]);

  usePrefetchPlaces(placeIds);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNav, setActiveNav] = useState<NavKey>("place");

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < placeIds.length - 1;

  const handlePrev = () => {
    if (!hasPrev) return;
    setActiveIndex((p) => p - 1);
  };

  const handleNext = () => {
    if (!hasNext) return;
    setActiveIndex((p) => p + 1);
  };

  const placeSectionRef = useRef<HTMLDivElement | null>(null);
  const scheduleSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (key: NavKey) => {
    setActiveNav(key);
    const target =
      key === "place" ? placeSectionRef.current : scheduleSectionRef.current;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  return (
    <Column className="w-full max-w-240 mx-auto px-6 py-24 gap-2">
      <Column className="gap-1 items-center">
        <Title variant="title2" className="font-extrabold fc-gray-900">
          {content.name}
        </Title>
        <Body variant="body2" className="fc-gray-700">
          {content.province}
        </Body>
      </Column>

      <Row className="w-full justify-center flex-wrap gap-2 pt-1 pb-10">
        {(content.tags ?? []).map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </Row>

      <Row className="w-full items-center gap-10 border-b border-gray-200 pl-10">
        <Button
          type="button"
          onClick={() => scrollTo("place")}
          className={cn(
            "bg-transparent p-0 h-10 rounded-none hover:bg-transparent text-body2 font-bold!",
            activeNav === "place"
              ? "fc-gray-900 font-semibold border-b-2 border-gray-900"
              : "fc-gray-500 font-medium",
          )}
        >
          장소 정보
        </Button>
        <Border direction="vertical" className="my-2" />
        <Button
          type="button"
          onClick={() => scrollTo("schedule")}
          className={cn(
            "bg-transparent p-0 h-10 rounded-none hover:bg-transparent text-body2 font-bold!",
            activeNav === "schedule"
              ? "fc-gray-900 font-semibold border-b-2 border-gray-900"
              : "fc-gray-500 font-medium",
          )}
        >
          여행 일정
        </Button>
      </Row>

      <div ref={placeSectionRef} className="scroll-mt-24" />

      {placeIds.length > 0 ? (
        <Column className="w-full gap-4 min-h-0">
          <div className="w-full">
            <PlaceSlide
              placeId={placeIds[activeIndex]}
              index={activeIndex}
              total={placeIds.length}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          </div>
        </Column>
      ) : (
        <Column className="rounded-lg border p-6 items-center justify-center">
          <Body variant="body2" className="fc-gray-600">
            등록된 장소가 없습니다.
          </Body>
        </Column>
      )}

      <div ref={scheduleSectionRef} className="scroll-mt-24" />

      <Column className="w-full mt-10 gap-3">
        <Subtitle variant="subtitle2" className="font-bold fc-gray-900">
          여행 일정
        </Subtitle>
        <Border />
        <Row className="justify-center">
          <Planner schedule={content.schedule} />
        </Row>
      </Column>

      <Row className="w-full justify-center mt-20">
        <Button
          onClick={() => navigate({ to: ROUTES.My })}
          className="px-10 h-12 rounded-full border border-emphasis bg-emphasis text-[16px] font-bold text-white"
        >
          내 여행 보기
        </Button>
      </Row>
    </Column>
  );
};

export default ModelPlanPage;

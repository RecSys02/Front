import Column from "@/components/common/container/column";
import type { TabValue } from "../../model.type";
import { SidebarHeader, SidebarContent } from "@/components/ui/sidebar/sidebar";
import SpotSidebarItem from "./spot-sidebar-item";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/common/button/button";
import { useModel } from "@/hooks/model.hook";
import { useModelContext } from "../../model.hook";
import { ModelInputStore } from "@/stores/model-input.store";
import { ModelHistoryStore } from "@/stores/model-history.store";
import { useMemo, useRef } from "react";
import { toast } from "sonner";
import { PlaceDto } from "@/types/place/place.type";
import { ModelResponseDto, ModelRequestDto } from "@/types/model/model.type";
import { TEMP_MODEL_RESULTS } from "./model.mock";

type Props = {
  tab: TabValue;
  onChangeTab: (tab: TabValue) => void;
  places: PlaceDto[];
  selectedPlaces: PlaceDto[];
  activePlaceId: number | null;
  onFocusPlace: (id: number | null) => void;
  onCreatePlan: () => void;
  onCloseOverlay?: () => void;
};
const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const SpotSidebar = ({
  tab,
  onChangeTab,
  places,
  selectedPlaces,
  activePlaceId,
  onFocusPlace,
  onCreatePlan,
  onCloseOverlay,
}: Props) => {
  const model = useModel();
  const tempIdxRef = useRef(0);

  const pickTempResult = (): ModelResponseDto => {
    const idx = tempIdxRef.current % TEMP_MODEL_RESULTS.length;
    tempIdxRef.current += 1;
    return TEMP_MODEL_RESULTS[idx];
  };

  const { historyPlaces, setHistoryPlaces, setSelectedPlaces, setModelResult } =
    useModelContext();

  const savedPlaces = useMemo(() => {
    const map = new Map<number, PlaceDto>();
    historyPlaces.forEach((p) => map.set(p.id, p));
    return Array.from(map.values());
  }, [historyPlaces]);

  const listPlaces = tab === "saved" ? savedPlaces : places;

  const resolveModelResult = (data: ModelResponseDto): ModelResponseDto => {
    return IS_MOCK ? pickTempResult() : data;
  };

  const onGeneratePlaces = () => {
    if (model.isPending) return;
    if (selectedPlaces.length === 0) {
      toast.error("최소 1개 이상의 장소를 선택해야 합니다.");
      return;
    }

    const input = ModelInputStore.actions.getModelInput();
    if (!input) return;

    const nextHistory = ModelHistoryStore.actions.appendHistoryPlaces(
      historyPlaces,
      selectedPlaces,
    );

    setHistoryPlaces(nextHistory);

    const region = `${input.region.province} ${input.region.district}`.trim();

    const payload: ModelRequestDto = {
      region,
      companion: input.companion ?? undefined,
      budget: input.budget,
      selectedPlaces: selectedPlaces.map((p) => ({
        placeId: p.placeId,
        category: p.category,
        province: p.province,
      })),
      historyPlaces: nextHistory.map((p) => ({
        placeId: p.placeId,
        category: p.category,
        province: p.province,
      })),
    };

    model.mutate(
      { body: payload },
      {
        onSuccess: (res: any) => {
          const dto = (res?.body ?? res) as ModelResponseDto;
          const nextResult = resolveModelResult(dto);

          setSelectedPlaces([]);
          setModelResult(nextResult);

          onCloseOverlay?.();
          onChangeTab("tourspot");
        },
      },
    );
  };

  const canCreatePlan = historyPlaces.length > 0 || selectedPlaces.length > 0;

  return (
    <>
      <SidebarHeader className="border-b px-3 py-4 bg-white">
        <Column className="gap-3">
          <Body className="font-semibold text-center">AI 추천 장소</Body>

          <Tabs value={tab} onValueChange={(v) => onChangeTab(v as TabValue)}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="tourspot">관광지</TabsTrigger>
              <TabsTrigger value="restaurant">음식점</TabsTrigger>
              <TabsTrigger value="cafe">카페</TabsTrigger>
              <TabsTrigger value="saved">저장</TabsTrigger>
            </TabsList>
          </Tabs>
        </Column>
      </SidebarHeader>

      <SidebarContent className="h-full bg-white flex flex-col">
        <Column className="flex-1 overflow-y-auto">
          {listPlaces.map((p, idx) => (
            <Column key={p.id} className="gap-0">
              <SpotSidebarItem
                place={p}
                isActive={p.id === activePlaceId}
                isSelected={selectedPlaces.some((x) => x.id === p.id)}
                onFocus={(id) => onFocusPlace(id)}
              />
              {idx < listPlaces.length - 1 && <Border />}
            </Column>
          ))}

          {tab === "saved" && listPlaces.length === 0 && (
            <div className="p-4">
              <Body className="text-sm! text-center text-muted-foreground">
                저장된 장소가 없습니다.
              </Body>
            </div>
          )}
        </Column>

        <div className="shrink-0 bg-white p-3 border-t">
          <Column className="gap-2">
            <Button
              className="w-full bg-emphasis text-white hover:opacity-80 active:opacity-100"
              onClick={onGeneratePlaces}
            >
              계속 추천
            </Button>

            <Button
              className="w-full"
              variant="outline"
              onClick={onCreatePlan}
              disabled={!canCreatePlan}
            >
              일정 생성
            </Button>
          </Column>
        </div>
      </SidebarContent>
    </>
  );
};

export default SpotSidebar;

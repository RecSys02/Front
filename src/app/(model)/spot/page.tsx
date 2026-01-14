import { useMemo, useState } from "react";
import { useModelContext } from "../model.hook";
import type { TabValue } from "../model.type";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar/sidebar";
import SpotMap from "./_components/spot-map";
import SpotDetailOverlay from "./_components/spot-detail-overlay";
import SpotSidebar from "./_components/spot-sidebar";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn, toYYYYMMDD } from "@/libs/utils";
import { Button } from "@/components/common/button/button";
import { useSpotOverlayNav } from "./_lib/spot.hook";
import { getPlacesByCategory, toggleSelectedPlaces } from "./_lib/spot.util";
import { useCreatePlan } from "@/hooks/plan.hook";
import { ModelInputStore } from "@/stores/model-input.store";
import { PlaceDto } from "@/types/place/place.type";
import { CreatePlanRequestDto } from "@/types/plan/plan.wrapper.type";

const ModelSpotPage = () => {
  const {
    modelResult,
    selectedPlaces,
    setSelectedPlaces,
    activePlaceId,
    setActivePlaceId,
    historyPlaces,
  } = useModelContext();

  const [tab, setTab] = useState<TabValue>("tourspot");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const createPlan = useCreatePlan();

  const places: PlaceDto[] = useMemo(() => {
    if (tab === "saved") return [];
    return getPlacesByCategory(modelResult, tab);
  }, [modelResult, tab]);

  const activePlacePool: PlaceDto[] = useMemo(() => {
    const map = new Map<number, PlaceDto>();

    places.forEach((p) => map.set(p.id, p));
    historyPlaces.forEach((p) => map.set(p.id, p));
    selectedPlaces.forEach((p) => map.set(p.id, p));

    return Array.from(map.values());
  }, [places, historyPlaces, selectedPlaces]);

  const activePlace =
    activePlacePool.find((p) => p.id === activePlaceId) ?? null;

  const {
    overlayOpen,
    setOverlayOpen,
    setNavHistory,
    hasPrev,
    focusPlace,
    goPrev,
    closeOverlayOnly,
  } = useSpotOverlayNav({ activePlaceId, setActivePlaceId });

  const detailOpen = sidebarOpen && overlayOpen && !!activePlace;

  const panelRight = detailOpen
    ? "right-200"
    : sidebarOpen
    ? "right-100"
    : "right-0";

  const toggleSelectPlace = (p: PlaceDto) => {
    setSelectedPlaces((prev) => toggleSelectedPlaces(prev, p));
  };

  const handleMarkerClick = (id: number) => {
    focusPlace(id, true);
  };

  const handleTogglePanel = () => {
    if (detailOpen) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen((v) => !v);
  };

  const onCreatePlan = () => {
    if (createPlan.isPending) return;

    const input = ModelInputStore.actions.getModelInput();

    const startDate = toYYYYMMDD(input?.dateRange?.from ?? null);
    const endDate = toYYYYMMDD(input?.dateRange?.to ?? null);
    const province = input?.region.province ?? null;
    if (!startDate || !endDate || !province) {
      return;
    }

    const merged = new Map<number, PlaceDto>();
    historyPlaces.forEach((p) => merged.set(p.id, p));
    selectedPlaces.forEach((p) => merged.set(p.id, p));

    const placesPayload = Array.from(merged.values()).map((p) => ({
      placeId: p.placeId,
      category: p.category,
      province: p.province,
    }));

    const createPlanPayload: CreatePlanRequestDto = {
      selectedPlaces: placesPayload,
      name: `${startDate} ${province} 여행 계획`,
      startDate: startDate,
      endDate: endDate,
      province: province,
      isPrivate: false,
    };
    createPlan.mutate({ body: createPlanPayload });
  };

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="h-dvh w-dvw overflow-hidden">
        <Sidebar
          side="right"
          collapsible="offcanvas"
          className={cn("border-l z-40 [--sidebar-width:400px]")}
        >
          <SpotSidebar
            tab={tab}
            onChangeTab={(next) => {
              setTab(next);
              if (next !== "saved") {
                const nextPlaces = getPlacesByCategory(modelResult, next);
                setActivePlaceId(nextPlaces[0]?.id ?? null);
                setOverlayOpen(false);
                setNavHistory([]);
              }
            }}
            places={places}
            selectedPlaces={selectedPlaces}
            activePlaceId={activePlaceId}
            onFocusPlace={(id) => focusPlace(id, true)}
            onCloseOverlay={() => {
              setOverlayOpen(false);
              setNavHistory([]);
              setActivePlaceId(null);
            }}
            onCreatePlan={onCreatePlan}
          />
        </Sidebar>

        <SidebarInset className="relative h-full w-full">
          <Button
            type="button"
            size="icon"
            onClick={handleTogglePanel}
            className={cn(
              "absolute z-50 top-1/2 -translate-y-1/2",
              "h-12 w-8 rounded-l-md rounded-r-none",
              "bg-white border border-r-0",
              "transition-opacity duration-150 ease-out",
              panelRight
            )}
          >
            {!sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          <SpotMap
            places={places}
            activePlace={activePlace}
            historyPlaces={historyPlaces}
            sidebarOpen={sidebarOpen}
            detailOpen={detailOpen}
            onMarkerClick={handleMarkerClick}
            onMapClick={() => {
              setOverlayOpen(false);
              setNavHistory([]);
              setActivePlaceId(null);
            }}
          />

          <SpotDetailOverlay
            open={detailOpen}
            place={activePlace}
            isSelected={
              !!activePlace &&
              selectedPlaces.some((x) => x.id === activePlace.id)
            }
            onClose={closeOverlayOnly}
            onToggleSelect={() => activePlace && toggleSelectPlace(activePlace)}
            hasPrev={hasPrev}
            onPrev={goPrev}
            hideSelectButton={tab == "saved"}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotPage;

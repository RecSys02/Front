import { useState } from "react";
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
import { cn } from "@/libs/utils";
import { Button } from "@/components/common/button/button";
import { useSpotOverlayNav, useSpotDerived } from "./_lib/spot.nav.hook";
import { getPlacesByCategory, toggleSelectedPlaces } from "./_lib/spot.util";
import PlanCreatingOverlay from "./_components/plan-creating-overlay";
import ModelSpotSkeleton from "./_components/model-spot-skeleton";
import {
  useAutoModelResult,
  useCreatePlanFromModel,
} from "./_lib/spot.flow.hook";
import type { PlaceDto } from "@/types/place/place.type";

const ModelSpotPage = () => {
  const {
    modelResult,
    setModelResult,
    selectedPlaces,
    setSelectedPlaces,
    activePlaceId,
    setActivePlaceId,
    historyPlaces,
  } = useModelContext();

  useAutoModelResult({ modelResult, setModelResult });

  const [tab, setTab] = useState<TabValue>("tourspot");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { places, activePlace } = useSpotDerived({
    tab,
    modelResult,
    historyPlaces,
    selectedPlaces,
    activePlaceId,
  });

  const {
    overlayOpen,
    setOverlayOpen,
    setNavHistory,
    hasPrev,
    focusPlace,
    goPrev,
    closeOverlayOnly,
  } = useSpotOverlayNav({ activePlaceId, setActivePlaceId });

  const { createPlan, onCreatePlan } = useCreatePlanFromModel({
    historyPlaces,
    selectedPlaces,
  });

  const detailOpen = sidebarOpen && overlayOpen && !!activePlace;

  const panelRight = detailOpen
    ? "right-200"
    : sidebarOpen
      ? "right-100"
      : "right-0";

  const toggleSelectPlace = (p: PlaceDto) => {
    setSelectedPlaces((prev) => toggleSelectedPlaces(prev, p));
  };

  const handleTogglePanel = () => {
    if (detailOpen) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen((v) => !v);
  };

  if (!modelResult) return <ModelSpotSkeleton />;

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
          <PlanCreatingOverlay open={createPlan.isPending} />

          <Button
            type="button"
            size="icon"
            onClick={handleTogglePanel}
            disabled={createPlan.isPending}
            className={cn(
              "absolute z-50 top-1/2 -translate-y-1/2",
              "h-12 w-8 rounded-l-md rounded-r-none",
              "bg-white border border-r-0",
              "transition-opacity duration-150 ease-out",
              panelRight,
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
            onMarkerClick={(id) => focusPlace(id, true)}
            onMapClick={() => {
              if (createPlan.isPending) return;
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
            onClose={() => {
              if (createPlan.isPending) return;
              closeOverlayOnly();
            }}
            onToggleSelect={() => {
              if (createPlan.isPending) return;
              if (!activePlace) return;
              toggleSelectPlace(activePlace);
            }}
            hasPrev={hasPrev}
            onPrev={() => {
              if (createPlan.isPending) return;
              goPrev();
            }}
            hideSelectButton={tab === "saved"}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotPage;

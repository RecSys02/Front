import { useState, useMemo, useEffect } from "react";
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

type OverlayMode = "CREATE_PLAN" | "GENERATE_RECO";

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
  const [isGeneratingReco, setIsGeneratingReco] = useState(false);

  const { places, activePlace } = useSpotDerived({
    tab,
    modelResult,
    historyPlaces,
    selectedPlaces,
    activePlaceId,
  });

  const {
    overlayOpen: spotOverlayOpen,
    setOverlayOpen: setSpotOverlayOpen,
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

  const pageOverlayOpen = createPlan.isPending || isGeneratingReco;

  const pageOverlayMode: OverlayMode | undefined = useMemo(() => {
    if (createPlan.isPending) return "CREATE_PLAN";
    if (isGeneratingReco) return "GENERATE_RECO";
    return undefined;
  }, [createPlan.isPending, isGeneratingReco]);

  const detailOpen = sidebarOpen && spotOverlayOpen && !!activePlace;

  const panelRight = detailOpen
    ? "right-[calc(var(--sidebar-width)+var(--detail-width))]"
    : sidebarOpen
      ? "right-[var(--sidebar-width)]"
      : "right-0";

  const toggleSelectPlace = (p: PlaceDto) => {
    setSelectedPlaces((prev) => toggleSelectedPlaces(prev, p));
  };

  const handleTogglePanel = () => {
    if (detailOpen) {
      setSpotOverlayOpen(false);
      setNavHistory([]);
      return;
    }

    setSidebarOpen((v) => !v);
  };
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);
  if (!modelResult) return <ModelSpotSkeleton />;

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="fixed inset-0 overflow-hidden [--sidebar-width:400px] [--detail-width:400px]">
        <Sidebar
          side="right"
          collapsible="offcanvas"
          className={cn("border-l z-40")}
        >
          <SpotSidebar
            tab={tab}
            onChangeTab={(next) => {
              setTab(next);
              if (next !== "saved") {
                const nextPlaces = getPlacesByCategory(modelResult, next);
                setActivePlaceId(nextPlaces[0]?.id ?? null);
                setSpotOverlayOpen(false);
                setNavHistory([]);
              }
            }}
            places={places}
            selectedPlaces={selectedPlaces}
            activePlaceId={activePlaceId}
            onFocusPlace={(id) => focusPlace(id, true)}
            onCloseOverlay={() => {
              setSpotOverlayOpen(false);
              setNavHistory([]);
              setActivePlaceId(null);
            }}
            onCreatePlan={onCreatePlan}
            onGeneratingChange={setIsGeneratingReco}
            disabled={pageOverlayOpen}
          />
        </Sidebar>

        <SidebarInset className="relative h-full w-full">
          <PlanCreatingOverlay open={pageOverlayOpen} mode={pageOverlayMode} />

          <Button
            type="button"
            size="icon"
            onClick={handleTogglePanel}
            disabled={pageOverlayOpen}
            className={cn(
              "absolute z-50 top-1/2 -translate-y-1/2",
              "h-12 w-8 rounded-l-md rounded-r-none",
              "bg-white border border-r-0",
              "transition-[right,opacity] duration-150 ease-out",
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
              if (pageOverlayOpen) return;
              setSpotOverlayOpen(false);
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
              if (pageOverlayOpen) return;
              closeOverlayOnly();
            }}
            onToggleSelect={() => {
              if (pageOverlayOpen) return;
              if (!activePlace) return;
              toggleSelectPlace(activePlace);
            }}
            hasPrev={hasPrev}
            onPrev={() => {
              if (pageOverlayOpen) return;
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

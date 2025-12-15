import { useState } from "react";
import { useModelContext } from "../model.hook";
import type { Place } from "../model.type";
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

const ModelSpotPage = () => {
  const {
    firstResult,
    selectedPlaces,
    setSelectedPlaces,
    activePlaceId,
    setActivePlaceId,
  } = useModelContext();

  const places = firstResult?.places ?? [];

  const activePlace =
    places.find((p) => p.id === activePlaceId) ??
    selectedPlaces[selectedPlaces.length - 1] ??
    places[0] ??
    null;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const detailOpen = sidebarOpen && !!activePlaceId;

  const panelRight = detailOpen
    ? "right-200"
    : sidebarOpen
    ? "right-100"
    : "right-0";

  const toggleSelectPlace = (p: Place) => {
    setSelectedPlaces((prev) =>
      prev.some((x) => x.id === p.id)
        ? prev.filter((x) => x.id !== p.id)
        : [...prev, p]
    );
  };

  const [history, setHistory] = useState<string[]>([]);
  const [ignorePush, setIgnorePush] = useState(false);

  const focusPlace = (id: string | null) => {
    if (ignorePush) {
      setIgnorePush(false);
      setActivePlaceId(id);
      return;
    }

    if (activePlaceId) {
      setHistory((prev) =>
        prev[prev.length - 1] === activePlaceId
          ? prev
          : [...prev, activePlaceId]
      );
    }
    setActivePlaceId(id);
  };

  const handleMarkerClick = (id: string) => {
    focusPlace(id);
    const p = places.find((x) => x.id === id);
    if (p) toggleSelectPlace(p);
  };

  const handleTogglePanel = () => {
    if (detailOpen) {
      setSidebarOpen(false);
      return;
    }
    setSidebarOpen((v) => !v);
  };

  const hasPrev = history.length > 0;

  const goPrev = () => {
    setHistory((prev) => {
      const next = [...prev];
      const prevId = next.pop();

      if (!prevId) {
        focusPlace(null);
        return [];
      }

      setIgnorePush(true);
      setActivePlaceId(prevId);
      return next;
    });
  };

  const closeOverlayOnly = () => {
    setHistory([]);
    setActivePlaceId(null);
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
            places={places}
            activePlaceId={activePlaceId}
            selectedPlaces={selectedPlaces}
            onFocusPlace={focusPlace}
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
            selectedPlaces={selectedPlaces}
            sidebarOpen={sidebarOpen}
            detailOpen={detailOpen}
            onMarkerClick={handleMarkerClick}
            onMapClick={() => focusPlace(null)}
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
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotPage;

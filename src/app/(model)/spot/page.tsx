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

  const toggleSelectPlace = (p: Place) => {
    setSelectedPlaces((prev) =>
      prev.some((x) => x.id === p.id)
        ? prev.filter((x) => x.id !== p.id)
        : [...prev, p]
    );
  };

  const handleMarkerClick = (id: string) => {
    setActivePlaceId(id);
    const p = places.find((x) => x.id === id);
    if (p) toggleSelectPlace(p);
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const detailOpen = sidebarOpen && !!activePlaceId;

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
            onFocusPlace={setActivePlaceId}
          />
        </Sidebar>

        <SidebarInset className="relative h-full w-full">
          {!detailOpen && (
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setSidebarOpen((v) => !v)}
              className={cn(
                "absolute z-50 top-1/2 -translate-y-1/2 rounded-full shadow-md",
                "transition-[right,opacity,transform] duration-300 ease-in-out",
                sidebarOpen ? "right-[400px]" : "right-3"
              )}
            >
              {sidebarOpen ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}

          <SpotMap
            places={places}
            activePlace={activePlace}
            selectedPlaces={selectedPlaces}
            sidebarOpen={sidebarOpen}
            detailOpen={detailOpen}
            onMarkerClick={handleMarkerClick}
            onMapClick={() => setActivePlaceId(null)}
          />

          <SpotDetailOverlay
            open={detailOpen}
            place={activePlace}
            isSelected={
              !!activePlace &&
              selectedPlaces.some((x) => x.id === activePlace.id)
            }
            onClose={() => setActivePlaceId(null)}
            onToggleSelect={() => activePlace && toggleSelectPlace(activePlace)}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotPage;

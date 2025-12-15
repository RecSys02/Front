import { useMemo, useRef, useState } from "react";
import { useModelContext } from "../model.hook";
import type { Place, PlaceCategory } from "../model.type";
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

  const [category, setCategory] = useState<PlaceCategory>("attraction");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const places: Place[] = useMemo(() => {
    const categorized = firstResult ?? {
      attractions: [],
      restaurants: [],
      cafes: [],
    };

    if (category === "attraction") return categorized.attractions;
    if (category === "restaurant") return categorized.restaurants;
    return categorized.cafes;
  }, [category, firstResult]);

  const activePlace = places.find((p) => p.id === activePlaceId) ?? null;

  const detailOpen = sidebarOpen && overlayOpen && !!activePlace;

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
  const isBackNavRef = useRef(false);

  const focusPlace = (id: string | null, openOverlay?: boolean) => {
    const openingOverlay = !!openOverlay && !overlayOpen;

    if (isBackNavRef.current) {
      isBackNavRef.current = false;
      setActivePlaceId(id);
      if (openOverlay && id) setOverlayOpen(true);
      return;
    }

    if (openingOverlay) {
      setHistory([]);
    } else if (overlayOpen && activePlaceId && activePlaceId !== id) {
      setHistory((prev) =>
        prev[prev.length - 1] === activePlaceId
          ? prev
          : [...prev, activePlaceId]
      );
    }

    setActivePlaceId(id);
    if (openOverlay && id) setOverlayOpen(true);
  };

  const handleMarkerClick = (id: string) => {
    focusPlace(id, true);
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
    const prevId = history[history.length - 1];
    if (!prevId) {
      isBackNavRef.current = false;
      setOverlayOpen(false);
      setHistory([]);
      return;
    }

    setHistory((prev) => prev.slice(0, -1));
    isBackNavRef.current = true;
    setActivePlaceId(prevId);
    setOverlayOpen(true);
  };

  const closeOverlayOnly = () => {
    isBackNavRef.current = false;
    setOverlayOpen(false);
    setHistory([]);
  };

  const handleChangeCategory = (c: PlaceCategory) => {
    const categorized = firstResult ?? {
      attractions: [],
      restaurants: [],
      cafes: [],
    };

    const nextPlaces =
      c === "attraction"
        ? categorized.attractions
        : c === "restaurant"
        ? categorized.restaurants
        : categorized.cafes;

    setCategory(c);
    setActivePlaceId(nextPlaces[0]?.id ?? null);
    setOverlayOpen(false);
    setHistory([]);
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
            category={category}
            onChangeCategory={handleChangeCategory}
            places={places}
            selectedPlaces={selectedPlaces}
            activePlaceId={activePlaceId}
            onFocusPlace={(id) => focusPlace(id, true)}
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
            sidebarOpen={sidebarOpen}
            detailOpen={detailOpen}
            onMarkerClick={handleMarkerClick}
            onMapClick={() => {
              setOverlayOpen(false);
              setHistory([]);
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
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModelSpotPage;

import { useMemo, useRef, useState } from "react";
import { appendHistory, getPlacesByCategory } from "./spot.util";
import type { PlaceDto } from "@/types/place/place.type";
import type { ModelResponseDto } from "@/types/model/model.type";
import type { TabValue } from "../../model.type";

type UseSpotOverlayNavParams = {
  activePlaceId: number | null;
  setActivePlaceId: (id: number | null) => void;
};

export const useSpotOverlayNav = ({
  activePlaceId,
  setActivePlaceId,
}: UseSpotOverlayNavParams) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [navHistory, setNavHistory] = useState<number[]>([]);
  const isBackNavRef = useRef(false);

  const focusPlace = (id: number | null, openOverlay?: boolean) => {
    const openingOverlay = !!openOverlay && !overlayOpen;

    if (isBackNavRef.current) {
      isBackNavRef.current = false;
      setActivePlaceId(id);
      if (openOverlay && id !== null) setOverlayOpen(true);
      return;
    }

    if (openingOverlay) {
      setNavHistory([]);
    } else if (overlayOpen && activePlaceId !== null && activePlaceId !== id) {
      setNavHistory((prev) => appendHistory(prev, activePlaceId));
    }

    setActivePlaceId(id);
    if (openOverlay && id !== null) setOverlayOpen(true);
  };

  const closeOverlayOnly = () => {
    isBackNavRef.current = false;
    setOverlayOpen(false);
    setNavHistory([]);
  };

  const goPrev = () => {
    const prevId = navHistory[navHistory.length - 1];

    if (prevId === undefined) {
      isBackNavRef.current = false;
      setOverlayOpen(false);
      setNavHistory([]);
      return;
    }

    setNavHistory((prev) => prev.slice(0, -1));
    isBackNavRef.current = true;
    setActivePlaceId(prevId);
    setOverlayOpen(true);
  };

  return {
    overlayOpen,
    setOverlayOpen,
    navHistory,
    setNavHistory,
    hasPrev: navHistory.length > 0,
    focusPlace,
    goPrev,
    closeOverlayOnly,
  };
};

export const useSpotDerived = (args: {
  tab: TabValue;
  modelResult: ModelResponseDto | null;
  historyPlaces: PlaceDto[];
  selectedPlaces: PlaceDto[];
  activePlaceId: number | null;
}) => {
  const { tab, modelResult, historyPlaces, selectedPlaces, activePlaceId } =
    args;

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

  return { places, activePlacePool, activePlace };
};

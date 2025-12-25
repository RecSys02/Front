import { useRef, useState } from "react";
import { appendHistory } from "./spot.util";

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

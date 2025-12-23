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
  const [history, setHistory] = useState<number[]>([]);
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
      setHistory([]);
    } else if (overlayOpen && activePlaceId !== null && activePlaceId !== id) {
      setHistory((prev) => appendHistory(prev, activePlaceId));
    }

    setActivePlaceId(id);
    if (openOverlay && id !== null) setOverlayOpen(true);
  };

  const closeOverlayOnly = () => {
    isBackNavRef.current = false;
    setOverlayOpen(false);
    setHistory([]);
  };

  const goPrev = () => {
    const prevId = history[history.length - 1];

    if (prevId === undefined) {
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

  return {
    overlayOpen,
    setOverlayOpen,
    history,
    setHistory,
    hasPrev: history.length > 0,
    focusPlace,
    goPrev,
    closeOverlayOnly,
  };
};

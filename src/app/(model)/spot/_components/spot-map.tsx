import { useEffect, useMemo, useRef, useState } from "react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Switch } from "@/components/ui/switch";
import {
  attachMarkerClick,
  buildBounds,
  clearMarkers,
  createHistoryMarker,
  createKakaoMarkerImage,
  createLucideMapPinSvgUrl,
  createMainMarker,
} from "../_lib/spot.util";
import { PlaceDto } from "@/types/place/place.type";

type Props = {
  places: PlaceDto[];
  activePlace: PlaceDto | null;
  historyPlaces?: PlaceDto[];
  onMarkerClick?: (id: number) => void;
  onMapClick?: () => void;
  sidebarOpen?: boolean;
  detailOpen?: boolean;
};

const SpotMap = ({
  places,
  activePlace,
  historyPlaces = [],
  onMarkerClick,
  onMapClick,
  sidebarOpen,
  detailOpen,
}: Props) => {
  const [showHistory, setShowHistory] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  const mainMarkersRef = useRef<any[]>([]);
  const historyMarkersRef = useRef<any[]>([]);

  const initialCenter = useMemo(() => {
    const first = places[0] ?? null;
    if (!first) return null;
    return { lat: first.latitude, lng: first.longitude };
  }, [places]);

  const markerImages = useMemo(() => {
    if (!window.kakao?.maps) return null;

    const maps = window.kakao.maps;

    const normalUrl = createLucideMapPinSvgUrl({ color: "#3b82f6" });
    const historyUrl = createLucideMapPinSvgUrl({ color: "#ef4444" });

    return {
      normal: createKakaoMarkerImage(maps, normalUrl, 32),
      active: createKakaoMarkerImage(maps, normalUrl, 44),
      history: createKakaoMarkerImage(maps, historyUrl, 32),
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!window.kakao?.maps) return;
    if (mapRef.current) return;
    if (!initialCenter) return;

    const center = new window.kakao.maps.LatLng(
      initialCenter.lat,
      initialCenter.lng
    );
    const options = { center, level: 3 };
    mapRef.current = new window.kakao.maps.Map(containerRef.current, options);

    if (onMapClick) {
      window.kakao.maps.event.addListener(mapRef.current, "click", () => {
        onMapClick();
      });
    }
  }, [onMapClick, initialCenter]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const map = mapRef.current;
    if (!map) return;

    const maps = window.kakao.maps;

    if (places.length === 0) return;

    const bounds = buildBounds(maps, places);
    map.setBounds(bounds, 80, 80, 80, 80);
  }, [places]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const map = mapRef.current;
    if (!map) return;

    const maps = window.kakao.maps;
    const images = markerImages;
    if (!images) return;

    clearMarkers(mainMarkersRef.current);

    places.forEach((p) => {
      const isActive = activePlace?.id === p.id;

      const marker = createMainMarker({
        maps,
        map,
        images: { normal: images.normal, active: images.active },
        place: p,
        isActive,
      });

      attachMarkerClick(maps, marker, onMarkerClick, p.id);
      mainMarkersRef.current.push(marker);
    });
  }, [places, activePlace, onMarkerClick, markerImages]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const map = mapRef.current;
    if (!map) return;

    const maps = window.kakao.maps;
    const images = markerImages;
    if (!images) return;

    clearMarkers(historyMarkersRef.current);

    if (!showHistory) return;

    historyPlaces.forEach((p) => {
      const marker = createHistoryMarker({
        maps,
        map,
        image: images.history,
        place: p,
      });

      attachMarkerClick(maps, marker, onMarkerClick, p.id);
      historyMarkersRef.current.push(marker);
    });
  }, [showHistory, historyPlaces, onMarkerClick, markerImages]);

  useEffect(() => {
    if (!window.kakao?.maps) return;
    const map = mapRef.current;
    if (!map) return;
    if (!activePlace) return;

    const target = new window.kakao.maps.LatLng(
      activePlace.latitude,
      activePlace.longitude
    );

    if (map.panTo) map.panTo(target);
    else map.setCenter(target);
  }, [activePlace]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const t = window.setTimeout(() => {
      map.relayout?.();
    }, 300);

    return () => window.clearTimeout(t);
  }, [sidebarOpen, detailOpen]);

  return (
    <Column className="relative h-full w-full">
      <div className="absolute z-50 top-4 left-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur px-3 py-2 shadow-sm border">
          <Row className="items-center gap-3">
            <Body className="text-xs!">저장 이력 표시</Body>
            <Switch
              checked={showHistory}
              onCheckedChange={() => setShowHistory((v) => !v)}
            />
          </Row>
        </div>
      </div>

      <div ref={containerRef} className="h-full w-full" />
    </Column>
  );
};

export default SpotMap;

import { useEffect, useRef } from "react";
import Column from "@/components/common/container/column";
import type { Place } from "../../model.type";

type Props = {
  places: Place[];
  selectedPlaces: Place[];
  activePlace: Place | null;
  onMarkerClick?: (id: string) => void;
  onMapClick?: () => void;
  sidebarOpen?: boolean;
  detailOpen?: boolean;
};

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

const SpotMap = ({
  places,
  activePlace,
  onMarkerClick,
  onMapClick,
  sidebarOpen,
  detailOpen,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!window.kakao?.maps) return;
    if (mapRef.current) return;

    const center = new window.kakao.maps.LatLng(
      DEFAULT_CENTER.lat,
      DEFAULT_CENTER.lng
    );
    const options = { center, level: 3 };
    mapRef.current = new window.kakao.maps.Map(containerRef.current, options);

    if (onMapClick) {
      window.kakao.maps.event.addListener(mapRef.current, "click", () =>
        onMapClick()
      );
    }
  }, [onMapClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    places.forEach((p) => {
      const pos = new window.kakao.maps.LatLng(p.latitude, p.longitude);
      const marker = new window.kakao.maps.Marker({ position: pos });
      marker.setMap(map);

      if (onMarkerClick) {
        window.kakao.maps.event.addListener(marker, "click", () =>
          onMarkerClick(p.id)
        );
      }

      markersRef.current.push(marker);
    });
  }, [places, onMarkerClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const target = activePlace
      ? new window.kakao.maps.LatLng(
          activePlace.latitude,
          activePlace.longitude
        )
      : new window.kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);

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
      <div ref={containerRef} className="h-full w-full" />
    </Column>
  );
};

export default SpotMap;

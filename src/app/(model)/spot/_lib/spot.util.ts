import { PlaceDto } from "@/types/model/model.type";
import { ModelResponseDto } from "@/types/model/model.wrapper.type";
import { PlaceCategory } from "../../model.type";

export const emptyModelResult: ModelResponseDto = {
  tourspots: [],
  restaurants: [],
  cafes: [],
};

export const getPlacesByCategory = (
  result: ModelResponseDto | null,
  category: PlaceCategory
): PlaceDto[] => {
  const r = result ?? emptyModelResult;
  if (category === "tourspot") return r.tourspots;
  if (category === "restaurant") return r.restaurants;
  return r.cafes;
};

export const toggleSelectedPlaces = (
  prev: PlaceDto[],
  p: PlaceDto
): PlaceDto[] => {
  return prev.some((x) => x.id === p.id)
    ? prev.filter((x) => x.id !== p.id)
    : [...prev, p];
};

export const appendHistory = (prev: number[], activeId: number): number[] => {
  return prev[prev.length - 1] === activeId ? prev : [...prev, activeId];
};

export type KakaoMaps = typeof window.kakao.maps;

export const createLucideMapPinSvgUrl = (opts: {
  color: string;
  size?: number;
}) => {
  const { color, size = 32 } = opts;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${size}" height="${size}"
      viewBox="0 0 24 24"
      fill="${color}">
      <path d="M12 2c-3.87 0-7 3.13-7 7
        0 5.25 7 13 7 13s7-7.75 7-13
        c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5" fill="white"/>
    </svg>
  `.trim();

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
};

export const createKakaoMarkerImage = (
  maps: KakaoMaps,
  url: string,
  sizePx = 32
) => {
  const size = new maps.Size(sizePx, sizePx);
  const option = { offset: new maps.Point(sizePx / 2, sizePx) };
  return new maps.MarkerImage(url, size, option);
};

export const getInitialCenter = (
  places: PlaceDto[],
  historyPlaces: PlaceDto[]
): { lat: number; lng: number } | null => {
  const first = places[0] ?? historyPlaces[0] ?? null;
  if (!first) return null;

  return {
    lat: first.latitude,
    lng: first.longitude,
  };
};

export const buildBounds = (maps: KakaoMaps, places: PlaceDto[]) => {
  const bounds = new maps.LatLngBounds();
  places.forEach((p) => {
    bounds.extend(new maps.LatLng(p.latitude, p.longitude));
  });
  return bounds;
};

export const clearMarkers = (markers: any[]) => {
  markers.forEach((m) => m.setMap(null));
  markers.length = 0;
};

export const makePlaceIdSet = (places: PlaceDto[]) => {
  return new Set<number>(places.map((p) => p.id));
};

export const attachMarkerClick = (
  maps: KakaoMaps,
  marker: any,
  onMarkerClick: ((id: number) => void) | undefined,
  id: number
) => {
  if (!onMarkerClick) return;
  maps.event.addListener(marker, "click", () => onMarkerClick(id));
};

export const createMainMarker = (params: {
  maps: KakaoMaps;
  map: any;
  images: { normal: any; active: any };
  place: PlaceDto;
  isActive: boolean;
}) => {
  const { maps, map, images, place, isActive } = params;

  const pos = new maps.LatLng(place.latitude, place.longitude);

  const marker = new maps.Marker({
    position: pos,
    image: isActive ? images.active : images.normal,
    zIndex: isActive ? 10 : 1,
  });

  marker.setMap(map);
  return marker;
};

export const createHistoryMarker = (params: {
  maps: KakaoMaps;
  map: any;
  image: any;
  place: PlaceDto;
}) => {
  const { maps, map, image, place } = params;

  const pos = new maps.LatLng(place.latitude, place.longitude);

  const marker = new maps.Marker({
    position: pos,
    image,
    zIndex: 2,
  });

  marker.setMap(map);
  return marker;
};

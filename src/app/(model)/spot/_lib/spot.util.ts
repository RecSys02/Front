import { ModelResult, PlaceCategory, Place } from "../../model.type";

export const emptyModelResult: ModelResult = {
  tourspots: [],
  restaurants: [],
  cafes: [],
};

export const getPlacesByCategory = (
  result: ModelResult | null,
  category: PlaceCategory
): Place[] => {
  const r = result ?? emptyModelResult;
  if (category === "tourspot") return r.tourspots;
  if (category === "restaurant") return r.restaurants;
  return r.cafes;
};

export const toggleSelectedPlaces = (prev: Place[], p: Place): Place[] => {
  return prev.some((x) => x.id === p.id)
    ? prev.filter((x) => x.id !== p.id)
    : [...prev, p];
};

export const appendHistory = (prev: number[], activeId: number): number[] => {
  return prev[prev.length - 1] === activeId ? prev : [...prev, activeId];
};

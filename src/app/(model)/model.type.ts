export type PlaceCategory = "tourspot" | "restaurant" | "cafe";
export type TabValue = PlaceCategory | "saved";

export type Place = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  duration: string;
  images?: string[];
  keywords?: string[];
  category: PlaceCategory;
  province: string;
  placeId: number;
};

export type ModelResult = {
  tourspots: Place[];
  restaurants: Place[];
  cafes: Place[];
};
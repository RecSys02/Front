export type PlaceCategory = "attraction" | "restaurant" | "cafe";

export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  category: PlaceCategory;
  description: string;
  picture?: string;
  keywords?: string[];
};

export type ModelResult = {
  attractions: Place[];
  restaurants: Place[];
  cafes: Place[];
};

export type Route = {
  dateLabel: string;
  items: {
    time: string;
    placeId?: string;
  }[];
};

export type RouteResult = {
  days: Route[];
};

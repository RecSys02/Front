export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

export type ModelResult = {
  places: Place[];
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

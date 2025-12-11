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
    title: string;
    placeId?: string;
    memo?: string;
  }[];
};

export type RouteResult = {
  days: Route[];
};

import { Place, ModelResult } from "../../model.type";

export const MOCK_PLACES: Place[] = [
  {
    id: "place-001",
    name: "성수 카페 거리",
    latitude: 37.5446,
    longitude: 127.0557,
  },
  {
    id: "place-002",
    name: "서울숲",
    latitude: 37.5444,
    longitude: 127.0374,
  },
  {
    id: "place-003",
    name: "뚝섬 한강공원",
    latitude: 37.5292,
    longitude: 127.0668,
  },
  {
    id: "place-004",
    name: "한남동",
    latitude: 37.5346,
    longitude: 127.002,
  },
  {
    id: "place-005",
    name: "이태원 거리",
    latitude: 37.5345,
    longitude: 126.9946,
  },
  {
    id: "place-006",
    name: "명동",
    latitude: 37.5636,
    longitude: 126.9827,
  },
  {
    id: "place-007",
    name: "경복궁",
    latitude: 37.5796,
    longitude: 126.977,
  },
  {
    id: "place-008",
    name: "홍대입구",
    latitude: 37.5572,
    longitude: 126.9245,
  },
];

export const MOCK_MODEL_RESULT: ModelResult = {
  places: MOCK_PLACES,
};

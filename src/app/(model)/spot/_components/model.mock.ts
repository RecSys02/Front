import { Place, ModelResult } from "../../model.type";

export const MOCK_PLACES: Place[] = [
  {
    id: "place-001",
    name: "성수 카페 거리",
    latitude: 37.5446,
    longitude: 127.0557,
    address: "서울특별시 성동구 성수동2가",
    description: "개성 있는 로스터리 카페와 감각적인 편집숍이 모여 있는 거리",
    picture: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    keywords: ["카페", "핫플", "산책", "감성"],
  },
  {
    id: "place-002",
    name: "서울숲",
    latitude: 37.5444,
    longitude: 127.0374,
    address: "서울특별시 성동구 뚝섬로 273",
    description: "도심 속에서 자연을 즐길 수 있는 대형 시민공원",
    picture: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    keywords: ["공원", "자연", "산책", "휴식"],
  },
  {
    id: "place-003",
    name: "뚝섬 한강공원",
    latitude: 37.5292,
    longitude: 127.0668,
    address: "서울특별시 광진구 자양동",
    description: "한강을 따라 산책과 피크닉을 즐기기 좋은 장소",
    picture: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    keywords: ["한강", "피크닉", "야경", "자전거"],
  },
  {
    id: "place-004",
    name: "한남동",
    latitude: 37.5346,
    longitude: 127.002,
    address: "서울특별시 용산구 한남동",
    description: "트렌디한 레스토랑과 문화 공간이 공존하는 동네",
    picture: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    keywords: ["맛집", "문화", "트렌디", "데이트"],
  },
];

export const MOCK_MODEL_RESULT: ModelResult = {
  places: MOCK_PLACES,
};

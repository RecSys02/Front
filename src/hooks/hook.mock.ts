import {
  MyPlanListResponseDto,
  PopularPlanCardDto,
} from "@/types/plan/plan.wrapper.type";
import Banner1 from "@/assets/banners/banner1.jpg";
import { PlaceDto } from "@/types/place/place.type";

export const MOCK_POPULAR: PopularPlanCardDto[] = [
  {
    id: 1,
    name: "제주도 3박 4일제주도 3박 4일제주도 3박 4일제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 120,
    isActive: true,
    image: "",
  },
  {
    id: 2,
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 80,
    isActive: false,
    image: Banner1,
  },
  {
    id: 3,
    name: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 75,
    isActive: false,
    image: Banner1,
  },
  {
    id: 4,
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 50,
    isActive: true,
    image: Banner1,
  },
  {
    id: 5,
    name: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 40,
    isActive: false,
    image: Banner1,
  },
  {
    id: 6,
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 20,
    isActive: false,
    image: Banner1,
  },
];

export const MOCK_CREATE_PLAN = {
  schedule: [
    {
      date: "2026-01-02",
      activities: [
        {
          name: "성수 카페성수 카페성수 카페성수 카페성수 카페성수 카페성수 카페",
          placeId: 1,
          category: "CAFE",
          province: "종로구",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          name: "성수 음식점",
          placeId: 2,
          category: "RESTAURANT",
          province: "종로구",
          startTime: "12:30",
          endTime: "14:00",
        },
      ],
    },
    {
      date: "2026-01-03",
      activities: [
        {
          name: "성수 팝업스토어",
          placeId: 3,
          category: "TOURSPOT",
          province: "종로구",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          name: "성수 음식점",
          placeId: 4,
          category: "RESTAURANT",
          province: "종로구",
          startTime: "12:30",
          endTime: "14:00",
        },
      ],
    },
  ],
};

export const MOCK_PLAN: MyPlanListResponseDto = [
  {
    id: 1,
    name: "서울역 여행",
    isPrivate: false,
    schedule: [
      {
        date: "2025-12-24",
        activities: [
          {
            name: "남산타워",
            startTime: "16:00",
            endTime: "17:00",
            category: "TOURSPOT",
            placeId: 101,
            province: "서울",
          },
          {
            name: "보니스 피자펍",
            startTime: "18:00",
            endTime: "19:00",
            category: "RESTAURANT",
            placeId: 102,
            province: "서울",
          },
        ],
      },
      {
        date: "2025-12-25",
        activities: [
          {
            name: "숭례문",
            startTime: "09:00",
            endTime: "11:00",
            category: "TOURSPOT",
            placeId: 103,
            province: "서울",
          },
          {
            name: "그라운드시소 센트럴",
            startTime: "15:00",
            endTime: "16:00",
            category: "TOURSPOT",
            placeId: 104,
            province: "서울",
          },
          {
            name: "Matches",
            startTime: "20:00",
            endTime: "21:00",
            category: "RESTAURANT",
            placeId: 105,
            province: "서울",
          },
        ],
      },
      {
        date: "2025-12-26",
        activities: [
          {
            name: "도량",
            startTime: "11:00",
            endTime: "12:00",
            category: "RESTAURANT",
            placeId: 106,
            province: "서울",
          },
          {
            name: "경복궁",
            startTime: "13:00",
            endTime: "15:00",
            category: "TOURSPOT",
            placeId: 107,
            province: "서울",
          },
          {
            name: "CAFE",
            startTime: "16:00",
            endTime: "17:00",
            category: "CAFE",
            placeId: 108,
            province: "서울",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "가을 여행",
    isPrivate: false,
    schedule: [
      {
        date: "2025-09-12",
        activities: [
          {
            name: "장소",
            startTime: "12:00",
            endTime: "13:00",
            category: "TOURSPOT",
            placeId: 201,
            province: "경기",
          },
          {
            name: "커피",
            startTime: "09:00",
            endTime: "10:00",
            category: "CAFE",
            placeId: 202,
            province: "경기",
          },
        ],
      },
      {
        date: "2025-09-13",
        activities: [
          {
            name: "밥",
            startTime: "12:00",
            endTime: "13:00",
            category: "RESTAURANT",
            placeId: 203,
            province: "경기",
          },
        ],
      },
    ],
  },
];

export const MOCK_PLACE: PlaceDto = {
  id: 1,
  placeId: 1,
  name: "서울숲",
  latitude: 37.5444,
  longitude: 127.0374,
  address: "서울특별시 성동구 뚝섬로 273",
  description: "도심 속에서 자연을 즐길 수 있는 대형 시민공원",
  duration: "2~3시간",
  keywords: ["공원", "자연", "산책", "휴식"],
  category: "TOURSPOT",
  province: "서울",
};

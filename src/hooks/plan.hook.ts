import { tsr } from "@/apis/client/ts-rest/client";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import Banner1 from "@/assets/banners/banner1.jpg";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import {
  CreatePlanRequestDto,
  CreatePlanResponseDto,
  MyPlanListResponseDto,
  PopularPlanCardDto,
} from "@/types/plan/plan.wrapper.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_POPULAR: PopularPlanCardDto[] = [
  {
    name: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 120,
    isActive: true,
    imgSrc: Banner1,
  },
  {
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 80,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    name: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 75,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 50,
    isActive: true,
    imgSrc: Banner1,
  },
  {
    name: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 40,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    name: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likeCount: 20,
    isActive: false,
    imgSrc: Banner1,
  },
];

export const usePopular = () => {
  const real = tsr.plan.popular.useQuery({
    queryKey: ["plan", "popular"],
    enabled: !IS_MOCK,
  });

  const mock = useQuery({
    queryKey: ["plan", "popular"],
    queryFn: async () => MOCK_POPULAR,
    enabled: IS_MOCK,
  });

  return IS_MOCK ? mock : real;
};

const MOCK_CREATE_PLAN = {
  schedule: [
    {
      date: "2026-01-02",
      activities: [
        {
          name: "성수 카페",
          placeId: 1,
          category: "cafe",
          province: "종로구",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          name: "성수 음식점",
          placeId: 2,
          category: "restaurant",
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
          category: "tourspot",
          province: "종로구",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          name: "성수 음식점",
          placeId: 4,
          category: "restaurant",
          province: "종로구",
          startTime: "12:30",
          endTime: "14:00",
        },
      ],
    },
  ],
};

export const useCreatePlan = () => {
  const navigate = useNavigate();

  const real = tsr.plan.create.useMutation({
    onSuccess: () => {
      navigate({ to: ROUTES.ModelPlan });
    },
  });

  const mock = useMutation<CreatePlanResponseDto, Error, CreatePlanRequestDto>({
    mutationFn: async () => MOCK_CREATE_PLAN,
    onSuccess: () => {
      navigate({ to: ROUTES.ModelPlan });
    },
  });

  return IS_MOCK ? mock : real;
};

const MOCK_PLAN: MyPlanListResponseDto = [
  {
    id: 1,
    name: "서울역 여행",
    schedule: [
      {
        date: "2025-12-24",
        activities: [
          {
            name: "남산타워",
            startTime: "16:00",
            endTime: "17:00",
            category: "관광지",
            placeId: 101,
            province: "서울",
          },
          {
            name: "보니스 피자펍",
            startTime: "18:00",
            endTime: "19:00",
            category: "식당",
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
            category: "관광지",
            placeId: 103,
            province: "서울",
          },
          {
            name: "그라운드시소 센트럴",
            startTime: "15:00",
            endTime: "16:00",
            category: "관광지",
            placeId: 104,
            province: "서울",
          },
          {
            name: "Matches",
            startTime: "20:00",
            endTime: "21:00",
            category: "식당",
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
            category: "식당",
            placeId: 106,
            province: "서울",
          },
          {
            name: "경복궁",
            startTime: "13:00",
            endTime: "15:00",
            category: "관광지",
            placeId: 107,
            province: "서울",
          },
          {
            name: "카페",
            startTime: "16:00",
            endTime: "17:00",
            category: "카페",
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
    schedule: [
      {
        date: "2025-09-12",
        activities: [
          {
            name: "장소",
            startTime: "12:00",
            endTime: "13:00",
            category: "관광지",
            placeId: 201,
            province: "경기",
          },
          {
            name: "커피",
            startTime: "09:00",
            endTime: "10:00",
            category: "카페",
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
            category: "식당",
            placeId: 203,
            province: "경기",
          },
        ],
      },
    ],
  },
];
export type SearchFilterDTO = {
  from: string;
  to: string;
};
export const usePlanListByUser = (
  params?: SearchFilterDTO
): UseQueryResult<MyPlanListResponseDto> => {
  const key = [
    "plan",
    "read",
    params?.from ?? null,
    params?.to ?? null,
  ] as const;

  const real = tsr.plan.listByUser.useQuery({
    queryKey: key,
    query: params,
    enabled: !IS_MOCK,
  });

  const mock = useQuery<MyPlanListResponseDto>({
    queryKey: key,
    queryFn: async () => MOCK_PLAN,
    enabled: IS_MOCK,
  });
  return (IS_MOCK
    ? mock
    : real) as unknown as UseQueryResult<MyPlanListResponseDto>;
};

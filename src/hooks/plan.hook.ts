import { apiClient } from "@/apis/client/ts-rest/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Banner1 from "@/assets/banners/banner1.jpg";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

type PopularItem = {
  title: string;
  tags: string[];
  likes: number;
  isActive: boolean;
  imgSrc: string;
};
const MOCK_POPULAR: PopularItem[] = [
  {
    title: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 120,
    isActive: true,
    imgSrc: Banner1,
  },
  {
    title: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 80,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    title: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 75,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    title: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 50,
    isActive: true,
    imgSrc: Banner1,
  },
  {
    title: "제주도 3박 4일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 40,
    isActive: false,
    imgSrc: Banner1,
  },
  {
    title: "강릉으로 떠나는 2박 3일",
    tags: ["부드러운", "아무튼 좋은", "로컬", "저렴한", "활동적인"],
    likes: 20,
    isActive: false,
    imgSrc: Banner1,
  },
];

export const usePopular = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      if (IS_MOCK) {
        return MOCK_POPULAR;
      }
      const res = await apiClient.plan.popular.query();
      return res.body;
    },
  });
};

const MOCK_CREATE_PLAN = {
  schedule: [
    {
      date: "2026-01-02",
      activities: [
        {
          id: 1,
          name: "성수 카페",
          category: "cafe",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          id: 2,
          name: "성수 음식점",
          category: "restaurant",
          startTime: "12:30",
          endTime: "14:00",
        },
      ],
    },
    {
      date: "2026-01-03",
      activities: [
        {
          id: 3,
          name: "성수 팝업스토어",
          category: "tourspot",
          startTime: "09:30",
          endTime: "11:00",
        },
        {
          id: 4,
          name: "성수 음식점",
          category: "restaurant",
          startTime: "12:30",
          endTime: "14:00",
        },
      ],
    },
  ],
};

export type CreatePlanRequestDTO = {
  from: string;
  to: string;
  places: { placeId: number; category: string; province: string }[];
};

export type CreatePlanResponseDTO = {
  schedule: {
    date: string;
    activities: {
      id: number;
      name: string;
      category: string;
      startTime: string;
      endTime: string;
    }[];
  }[];
};

export const useCreatePlan = () => {
  const navigate = useNavigate();
  return useMutation<CreatePlanResponseDTO, Error, CreatePlanRequestDTO>({
    mutationFn: async (body) => {
      if (IS_MOCK) return MOCK_CREATE_PLAN;

      const res = await apiClient.plan.create.mutation({ body });

      return res.body;
    },

    onSuccess: () => {
      navigate({ to: ROUTES.ModelPlan });
    },
  });
};

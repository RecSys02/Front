import { apiClient } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";
import Banner1 from "@/assets/banners/banner1.jpg";

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
        return {
          body: MOCK_POPULAR,
        };
      }
      const res = apiClient.plan.popular.query();
      return res.body;
    },
  });
};

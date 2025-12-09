import { apiClient } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

type Schedules = {
    day: number, 
    name: string,
    start: string,
    end: string,
    category: string;
};

//
type PlannerItem = {
  //planTags: arr[]
  id: string;
  title: string;
  schedules: Schedules[];
  //isPrivate: boolean
  //like: int
  //created_at: ???
  //updated_at: ???
  
};

const MOCK_PLANNER: PlannerItem[] = [
  {
    id: "1",
    title: "서울역 여행",
    schedules: [
      { day: 1, name: "남산타워", start: "16:00", end: "17:00", category: "관광지",},
      { day: 1, name: "커피", start: "09:00", end: "10:00", category: "카페",},
      { day: 2, name: "냠냠", start: "12:00", end: "13:00", category: "밥",},
    ],
  },
];

export const usePlanner = () => {
  return useQuery({
    queryKey: ["planner"],
    queryFn: async () => {
      if (IS_MOCK) {
        return MOCK_PLANNER;
      }
      return apiClient.myplan.planner.query();
    },
    select: (res) => res.body,
  });
};

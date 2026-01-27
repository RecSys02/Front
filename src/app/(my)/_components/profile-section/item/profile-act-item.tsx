import { ReactNode } from "react";
import { TagIcon } from "lucide-react";

type ProfileActProps = {
  key: "PLAN" | "MYTAG";
  act: string;
  description?: string;
  icon: ReactNode;
  routeLink?: string;
};

export const PROFILE_ACT_ITEMS: ProfileActProps[] = [
  // {
  //   key: "PLAN",
  //   act: "저장된 플랜",
  //   description: "내가 만든 여행 일정을 확인해요",
  //   icon: <Map1 />,
  // },
  {
    key: "MYTAG",
    act: "태그 수정",
    description: "취향 태그를 변경할 수 있어요",
    icon: <TagIcon className="w-12 h-12" strokeWidth={1} />,
  },
];

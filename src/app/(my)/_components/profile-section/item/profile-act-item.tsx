import { ReactNode } from "react";
import { TagIcon } from "lucide-react";
import Map1 from "@/assets/map1.svg?react";

type ProfileActProps = {
  key: "PLAN" | "MYTAG";
  act: string;
  icon: ReactNode;
  routeLink?: string;
};

export const PROFILE_ACT_ITEMS: ProfileActProps[] = [
  {
    key: "PLAN",
    act: "저장된 플랜",
    icon: <Map1 />,
  },
  {
    key: "MYTAG",
    act: "태그 수정",
    icon: <TagIcon className="w-12 h-12" strokeWidth={1} />,
  },
];

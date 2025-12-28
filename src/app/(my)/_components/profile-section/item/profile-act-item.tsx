import { ReactNode } from "react";
import { TagIcon } from "lucide-react";
import Map1 from "@/assets/map1.svg?react";
import Question from "@/assets/question.svg?react";


type ProfileActProps = {
  key: "PLAN" | "MYTAG" | "QNA" | "QNA2" ;
  act: string;
  icon: ReactNode;
  routeLink: string;
};

export const PROFILE_ACT_ITEMS: ProfileActProps[] = [
  {
    key: "PLAN",
    act: "저장된 플랜",
    icon: <Map1/>,
    routeLink: ""
  },
  {
    key: "MYTAG",
    act: "태그 수정",
    icon: <TagIcon className="w-12 h-12" strokeWidth={1}/>,
    routeLink: ""
  },
  {
    key: "QNA",
    act: "Q&A",
    icon: <Question/>,
    routeLink: ""
  },
  {
    key: "QNA2",
    act: "Q&A",
    icon: <Question/>,
    routeLink: ""
  }
];
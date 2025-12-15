import { ReactNode } from "react";
import Map1 from "@/assets/map1.svg?react";
import Tag from "@/assets/tag.svg?react";
import Question from "@/assets/question.svg?react";
//import { IconName } from "lucide-react";

type ProfileActProps = {
  key: "PLAN" | "TAG" | "QNA" | "QNA2" ;
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
    key: "TAG",
    act: "태그 수정",
    icon: <Tag/>,
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
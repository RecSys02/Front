import { ReactNode } from "react";
import { MYROUTES } from "./my-routes";
import Map1 from "@/assets/map1.svg?react";
import Tag from "@/assets/tag.svg?react";
import Question from "@/assets/question.svg?react";
//import { IconName } from "lucide-react";

type ProfileActConfig = {
  act: string;
  icon: ReactNode;
  routeLink: string;
};

export const PROFILE_ACT_ITEMS: ProfileActConfig[] = [
  {
    act: "저장된 플랜",
    icon: <Map1/>,
    routeLink: MYROUTES.Plan
  },
  {
    act: "태그 수정",
    icon: <Tag/>,
    routeLink: MYROUTES.Tag
  },
  {
    act: "Q&A",
    icon: <Question/>,
    routeLink: MYROUTES.QnA
  },
  {
    act: "Q&A",
    icon: <Question/>,
    routeLink: MYROUTES.QnA
  }
];
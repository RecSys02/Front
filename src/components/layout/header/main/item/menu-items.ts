import { ROUTES } from "@/constants/routes";

export type HeaderMenuConfig = {
  key: "HOME" | "AI" | "HOT" | "PLAN";
  menuName: string;
  routeLink: string;
};

export const HEADER_MENU_ITEMS: HeaderMenuConfig[] = [
  {
    key: "HOME",
    menuName: "홈",
    routeLink: ROUTES.Home,
  },
  {
    key: "AI",
    menuName: "AI",
    routeLink: ROUTES.ModelPick,
  },
  {
    key: "HOT",
    menuName: "HOT",
    routeLink: ROUTES.Hot,
  },
  {
    key: "PLAN",
    menuName: "PLAN",
    routeLink: ROUTES.Plan,
  },
];

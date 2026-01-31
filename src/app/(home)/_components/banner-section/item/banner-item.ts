import { ROUTES } from "@/constants/routes";
import LeafIcon from "@/assets/leaf.png";
import Banner1 from "@/assets/banners/banner1.png";
import Banner2 from "@/assets/banners/banner2.png";
import Banner3 from "@/assets/banners/banner3.png";

export type BannerConfig = {
  title: string;
  image: string;
  iconSrc?: string;
  description: string;
  linkTo?: string;
  color: string;
};

export const AUTOPLAY_DELAY = 5000;
export const BANNER_ITEMS: BannerConfig[] = [
  {
    title: "나만의 여유로운 여행\n어슬렁",
    image: Banner1,
    iconSrc: LeafIcon,
    description: "고민은 뒤로, 오늘은 여행",
    linkTo: ROUTES.Home,
    color: "bg-base",
  },
  {
    title: "취향 저격 여행\nAI가 딱 맞게",
    image: Banner2,
    iconSrc: LeafIcon,
    description: "내 취향 기반 장소 추천부터 일정까지 한 번에",
    color: "bg-[#C7D7E5]",
  },
  {
    title: "궁금한 건 바로\n어슬렁 챗봇",
    image: Banner3,
    iconSrc: LeafIcon,
    description: "추천부터 계획까지 대화로 해결해요",
    linkTo: ROUTES.Home,
    color: "bg-[#F3DDAF]",
  },
];

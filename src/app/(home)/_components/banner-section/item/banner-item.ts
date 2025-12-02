import { ROUTES } from "@/constants/routes";
import LeafIcon from "@/assets/leaf.png";
import Placeholder from "@/assets/banners/placeholder.png";
import Banner1 from "@/assets/banners/banner1.jpg";
export type BannerConfig = {
  title: string;
  imgSrc: string;
  iconSrc?: string;
  description: string;
  linkTo?: string;
  color: string;
};

export const AUTOPLAY_DELAY = 5000;
export const BANNER_ITEMS: BannerConfig[] = [
  {
    title: "나만의 여유로운 여행\n어슬렁",
    imgSrc: Banner1,
    iconSrc: LeafIcon,
    description: "고민은 뒤로, 오늘은 여행",
    linkTo: ROUTES.Home,
    color: "bg-base",
  },
  {
    title: "으랏차차\n와이키키로 떠나자",
    imgSrc: Placeholder,
    iconSrc: LeafIcon,
    description: "고민은 뒤로, 오늘은 여행",
    color: "bg-white",
  },
  {
    title: "나만의 여유로운 여행\n어슬렁",
    imgSrc: Banner1,
    iconSrc: LeafIcon,
    description: "고민은 뒤로, 오늘은 여행",
    linkTo: ROUTES.Home,
    color: "bg-base",
  },
];

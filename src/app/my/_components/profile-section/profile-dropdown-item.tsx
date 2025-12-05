import { ReactNode } from "react";
import { RefreshCcw,ImagePlus,LockOpen,UserRoundMinus } from "lucide-react";

type ProfileDropdownConfig = {
  act: string;
  icon: ReactNode;
  routeLink?: string;
};

export const PROFILE_DROPDOWN_ITEMS: ProfileDropdownConfig[] = [
  {
    act: "닉네임 변경",
    icon: <RefreshCcw/>,
  },
  {
    act: "프로필 이미지 변경",
    icon: <ImagePlus/>,
  },
  {
    act: "로그아웃",
    icon: <LockOpen/>,
  },
  {
    act: "회원탈퇴",
    icon: <UserRoundMinus/>,
  },
];
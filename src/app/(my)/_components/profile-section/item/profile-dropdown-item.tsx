import { ReactNode } from "react";
import { RefreshCcw,ImagePlus,LockOpen,UserRoundMinus } from "lucide-react";

type ProfileDropdownProps = {
  name: string;
  icon: ReactNode;
  routeLink?: string;
};

export const PROFILE_DROPDOWN_ITEMS: ProfileDropdownProps[] = [
  {
    name: "닉네임 변경",
    icon: <RefreshCcw/>,
  },
  {
    name: "프로필 이미지 변경",
    icon: <ImagePlus/>,
  },
  {
    name: "로그아웃",
    icon: <LockOpen/>,
  },
  {
    name: "회원탈퇴",
    icon: <UserRoundMinus/>,
  },
];
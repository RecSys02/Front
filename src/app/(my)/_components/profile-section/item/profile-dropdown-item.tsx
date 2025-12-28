import { ReactNode } from "react";
import { RefreshCcwIcon, ImagePlusIcon, LockOpenIcon, UserRoundMinusIcon } from "lucide-react";

type ProfileDropdownProps = {
  name: string;
  icon: ReactNode;
  routeLink?: string;
};

export const PROFILE_DROPDOWN_ITEMS: ProfileDropdownProps[] = [
  {
    name: "닉네임 변경",
    icon: <RefreshCcwIcon/>,
  },
  {
    name: "프로필 이미지 변경",
    icon: <ImagePlusIcon/>,
  },
  {
    name: "로그아웃",
    icon: <LockOpenIcon/>,
  },
  {
    name: "회원탈퇴",
    icon: <UserRoundMinusIcon/>,
  },
];
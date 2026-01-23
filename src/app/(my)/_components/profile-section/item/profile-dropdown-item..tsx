import { ReactNode } from "react";
import { LogOut, RefreshCcw } from "lucide-react";
import { LogoutModal, RenameModal } from "./profile-modal";

export type ProfileDropdownItem = {
  label: string;
  icon: ReactNode;
  modal: (props: { open: boolean; onClose: () => void }) => ReactNode;
};

export const PROFILE_DROPDOWN_ITEMS: ProfileDropdownItem[] = [
  {
    label: "닉네임 변경",
    icon: <RefreshCcw className="size-4" />,
    modal: ({ open, onClose }) => <RenameModal open={open} onClose={onClose} />,
  },
  {
    label: "로그아웃",
    icon: <LogOut className="size-4" />,
    modal: ({ open, onClose }) => <LogoutModal open={open} onClose={onClose} />,
  },
];

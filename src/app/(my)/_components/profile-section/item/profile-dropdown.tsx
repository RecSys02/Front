import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisVerticalFilled from "@/assets/ellipsis-vertical-filled.svg?react";
import { useState } from "react";
import { PROFILE_DROPDOWN_ITEMS } from "./profile-dropdown-item.";

const ProfileDropdown = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="self-end">
          <EllipsisVerticalFilled className="size-9 cursor-pointer text-white/85!" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-44 p-1.5 bg-white border border-black/10 rounded-xl shadow-lg"
        >
          {PROFILE_DROPDOWN_ITEMS.map((item: any, idx: number) => (
            <DropdownMenuItem
              key={idx}
              onSelect={() => setActiveIndex(idx)}
              className="
                h-10 flex items-center gap-2 rounded-lg
                cursor-pointer text-gray-800
                hover:bg-black/5 focus:bg-black/5
              "
            >
              {item.icon}
              <span className="text-[14px]">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeIndex !== null &&
        PROFILE_DROPDOWN_ITEMS[activeIndex].modal({
          open: true,
          onClose: close,
        })}
    </>
  );
};

export default ProfileDropdown;

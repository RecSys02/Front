import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EllipsisVerticalFilled from "@/assets/ellipsis-vertical-filled.svg?react";
import { PROFILE_DROPDOWN_ITEMS } from "./profile-dropdown-item";

const ProfileDropdown = () => {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVerticalFilled className="h-12 w-12 mt-8 mr-4" strokeWidth={1.0}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white fc-gray-800 p-3">
                {PROFILE_DROPDOWN_ITEMS.map((item, i) => (
                    <DropdownMenuItem key={i} className="h-9 hover:bg-gray-100">
                        {item.icon}
                        {item.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdown;
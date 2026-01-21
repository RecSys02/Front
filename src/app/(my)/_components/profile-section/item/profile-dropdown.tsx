import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EllipsisVerticalFilled from "@/assets/ellipsis-vertical-filled.svg?react";
import { ReactNode, useRef, useState } from "react";
import { DeleteUserModal, RenameModal } from "./profile-modal";
import { ImagePlusIcon, LockOpenIcon, RefreshCcwIcon, UserRoundMinusIcon } from "lucide-react";

type ProfileDropdownProps = {
    name: string;
    icon: ReactNode;
    onSelect?: () => void;
};

const ProfileDropdown = () => {
    const [openRenameModal, setOpenRenameModal] = useState(false);
    const [openDelUserModal, setOpenDelUserModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [openCropModal, setOpenCropModal] = useState(false);

    const PROFILE_DROPDOWN_ITEMS: ProfileDropdownProps[] = [
        {
            name: "닉네임 변경",
            icon: <RefreshCcwIcon />,
            onSelect: () => setOpenRenameModal(true)
        },
        {
            name: "프로필 이미지 변경",
            icon: <ImagePlusIcon />,
            onSelect: () => fileInputRef.current?.click()
        },
        {
            name: "로그아웃",
            icon: <LockOpenIcon />,
        },
        {
            name: "회원탈퇴",
            icon: <UserRoundMinusIcon />,
            onSelect: () => setOpenDelUserModal(true)
        },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0])
            setOpenCropModal(true);
        }
    };

    return (
        <><DropdownMenu>
            <DropdownMenuTrigger>
                <EllipsisVerticalFilled className="h-10 w-10 cursor-pointer mt-8 mr-4" strokeWidth={1.0} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white fc-gray-800 p-3">
                {PROFILE_DROPDOWN_ITEMS.map((item, i) => (
                    <DropdownMenuItem key={i} className="h-9 cursor-pointer hover:bg-gray-100" onSelect={item.onSelect}>
                        {item.icon}
                        {item.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
            <RenameModal
                open={openRenameModal}
                onOpenChange={setOpenRenameModal}
                onClose={() => {
                    setOpenRenameModal(false);
                }} />
            <DeleteUserModal
                open={openDelUserModal}
                onOpenChange={setOpenDelUserModal}
                onClose={() => {
                    setOpenDelUserModal(false);
                }} />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </>

    );
};

export default ProfileDropdown;
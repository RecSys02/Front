import Column from "@/components/common/container/column";
import ProfileDropdown from "./profile-dropdown";

import { useUser } from "@/hooks/user.hook";
import { ImageBox } from "@/components/common/container/image-box";
import Body from "@/components/text/body";

const Profile = () => {
  const { data } = useUser();
  const userName = data?.userName;
  const userImg = data?.userImg;

  return (
    <Column
      className="w-85 h-100 rounded-xl px-4 py-5 items-center
               bg-[#2E5A43] border border-[#2E5A43]"
    >
      <ProfileDropdown />
      <div className="mt-15 rounded-full p-1 bg-white/10">
        <ImageBox className="size-20 rounded-full" src={userImg} />
      </div>
      <Column className="items-center justify-center gap-2.5 pt-6.75">
        <Body className="font-light text-white/85!">준비되셨나요?</Body>
        <Body className="font-bold text-[30px]! text-white!">
          {userName} 님
        </Body>
      </Column>
    </Column>
  );
};

export default Profile;

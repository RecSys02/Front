import Column from "@/components/common/container/column"
import Row from "@/components/common/container/row";
import Subtitle from "@/components/text/subtitle";
import Title from "@/components/text/title";
import ProfileDropdown from "./profile-dropdown";

import { useUser } from "@/hooks/user.hook";
import { CircleUserRoundIcon } from "lucide-react";

const Profile = () => {
    const { data, isSuccess } = useUser();
    const userName = data?.username;
    const userImg = data?.userimg;
    
    return(
        <Column className="w-110 h-145 bg-base items-center rounded-[16px]">
            <Row className="h-38 justify-end">
                <ProfileDropdown/>
            </Row>
            <Row className="justify-center">
                {userImg === null ? <CircleUserRoundIcon className="h-26 w-26" strokeWidth={1.0} /> : <img src={userImg}/>}
            </Row>
            <Column className="h-53 items-center justify-center gap-3">
                <Subtitle variant="subtitle2" className="fc-gray-800 font-light">준비완료!</Subtitle>
                <Title variant="title2" className="fc-gray-800 font-bold">{userName} 님</Title>
            </Column>
        </Column>
    )
}

export default Profile;
import Column from "@/components/common/container/column"
import Row from "@/components/common/container/row";
import Subtitle from "@/components/text/subtitle";
import Title from "@/components/text/title";
import ProfileDropdown from "./profile-dropdown";
import { CircleUserRoundIcon } from "lucide-react";
//import { useUser } from "@/hooks/user.hook";

const Profile = () => {
    return(
        <Column className="w-110 h-145 bg-base items-center rounded-[16px]">
            <Row className="h-38 justify-end">
                <ProfileDropdown/>
            </Row>
            <CircleUserRoundIcon className="h-26 w-26" strokeWidth={1.0}/>
            {/*프로필 사진 해당 위치 w-26 h-26 rounded-full*/}
            <Column className="h-53 items-center justify-center gap-3">
                <Subtitle variant="subtitle2" className="fc-gray-800 font-light">준비완료!</Subtitle>
                <Title variant="title2" className="fc-gray-800 font-medium">홍길동님</Title>
            </Column>
        </Column>
    )
}

export default Profile;
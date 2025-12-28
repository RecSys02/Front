import Column from "@/components/common/container/column"
import Row from "@/components/common/container/row";
import Subtitle from "@/components/text/subtitle";
import Title from "@/components/text/title";
import ProfileDropdown from "./profile-dropdown";
import Placeholder from "@/assets/banners/placeholder.png";

import { useUser } from "@/hooks/user.hook";

const Profile = () => {
    const { data, isSuccess } = useUser();
    const userName = data?.username;
    const userImg = data?.userimg;
    
    return(
        <Column className="w-110 h-145 bg-base rounded-[16px]">
            <Row className="h-38 justify-end">
                <ProfileDropdown/>
            </Row>
            <Row className="justify-center">
                <img className="w-32 rounded-full" src = {!userImg ? Placeholder : userImg}/>

            </Row>
            <Column className="h-53 items-center justify-center gap-3">
                <Subtitle variant="subtitle2" className="fc-gray-800 font-light">준비되셨나요?</Subtitle>
                <Title variant="title2" className="fc-gray-800 font-bold">{userName} 님</Title>
            </Column>
        </Column>
    );
};

export default Profile;
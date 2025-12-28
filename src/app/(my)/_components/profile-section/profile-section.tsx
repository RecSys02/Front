import Column from "@/components/common/container/column"
import Profile from "./item/profile"
import ProfileActContainer from "./item/profile-act-container";

const ProfileSection = () => {
    return(
        <Column className="w-fit h-fit gap-15">
            <Profile />
            <ProfileActContainer />
        </Column>
    );
};

export default ProfileSection;
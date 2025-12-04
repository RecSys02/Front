import Column from "@/components/common/container/column"
import Profile from "./profile"
import ProfileActContainer from "./profile-act-container";

const ProfileContainer = () => {
    return(
        <Column className="w-fit h-fit gap-10">
            <Profile />
            <ProfileActContainer />
        </Column>
    )
}

export default ProfileContainer;
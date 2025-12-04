import Heading from "@/components/text/heading";
import Column from "@/components/common/container/column";
import ProfileActItem from "../profile-act-item"
import Map1 from "@/assets/map1.svg?react";
import Tag from "@/assets/tag.svg?react";
import Question from "@/assets/question.svg?react";
import { MYROUTES } from "../my-routes";
//import { IconName } from "lucide-react";

const PROFILE_ACT_ITEMS = [
    {act: "저장된 플랜", icon: <Map1/>, routeLink: MYROUTES.Plan },
    {act: "태그 수정", icon: <Tag/>, routeLink: MYROUTES.Tag },
    {act: "Q&A", icon: <Question/>, routeLink: MYROUTES.QnA },
    {act: "Q&A", icon: <Question/>, routeLink: MYROUTES.QnA }
]

const ProfileActContainer = () => {
    return(
        <Column className="gap-5">
            <Heading variant="heading2" className="fc-gray-800 font-extrabold">나의활동</Heading>

            <Column className="w-fit border border-primary grid grid-cols-2 rounded-2xl py-3">
                {PROFILE_ACT_ITEMS.map((item) => (
                    <ProfileActItem
                    act={item.act}
                    icon={item.icon}
                    routeLink={item.routeLink}/>
                ))}       
            </Column>
        </Column>
    );  
};

export default ProfileActContainer;
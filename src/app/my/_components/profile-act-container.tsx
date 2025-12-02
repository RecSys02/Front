import Heading from "@/components/text/heading";
import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import ProfileActItem from "./profile-act-item"
import Map1 from "@/assets/map1.svg?react";
import Tag from "@/assets/tag.svg?react";
import Question from "@/assets/question.svg?react";
//import { IconName } from "lucide-react";


const ProfileActContainer = () => {
    return(
        <Column className="gap-6">
            <Heading variant="heading2" className="fc-gray-800 font-extrabold">나의활동</Heading>
            <Column className="w-fit border border-primary rounded-2xl py-3">
            <Row>
                <ProfileActItem act="저장된 플랜" icon = {<Map1/>}/>
                <ProfileActItem act="태그 수정" icon = {<Tag/>}/>
            </Row><Row>
                    <ProfileActItem act="???" icon = {<Question/>}/>
                    <ProfileActItem act="Q&A" icon = {<Question/>}/>
                </Row>
            </Column>
        </Column>
    );  
};

export default ProfileActContainer;
import Heading from "@/components/text/heading";
import Column from "@/components/common/container/column";
import { PROFILE_ACT_ITEMS } from "./profile-act-item"
import { Link } from "@tanstack/react-router";
import Subtitle from "@/components/text/subtitle";

const ProfileActContainer = () => {
    return(
        <Column className="gap-5">
            <Heading variant="heading2" className="fc-gray-800 font-extrabold">나의활동</Heading>

            <Column className="w-fit border border-primary grid grid-cols-2 rounded-2xl py-3">
                {PROFILE_ACT_ITEMS.map((item) => (
                    <Column className="w-55 h-47 items-center justify-center gap-3">
                        <div className="w-21 h-21 bg-gray-100 rounded-[32px] rounded-tr-[0px] flex items-center justify-center">
                            <Link to={item.routeLink}>
                               {item.icon}
                            </Link>
                        </div>
                        <Subtitle variant="subtitle2" className="font-normal fc-gray-700 ">{item.act}</Subtitle>
                    </Column>
                ))}       
            </Column>
        </Column>
    );  
};

export default ProfileActContainer;
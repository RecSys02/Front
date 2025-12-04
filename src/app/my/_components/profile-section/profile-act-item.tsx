import Column from "@/components/common/container/column";
import Subtitle from "@/components/text/subtitle";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

type Props = {
  act: string;
  icon: ReactNode;
  routeLink: string;
};

const ProfileActItem = ({act,icon,routeLink}: Props) => {
    return ( 
        <Column className="w-55 h-47 items-center justify-center gap-3">
            <div className="w-21 h-21 bg-gray-100 rounded-[32px] rounded-tr-[0px] flex items-center justify-center">
                <Link to={routeLink}>
                    {icon}
                </Link>
            </div>
            <Subtitle variant="subtitle2" className="font-normal fc-gray-700 ">{act}</Subtitle>
        </Column>
    );
};

export default ProfileActItem;
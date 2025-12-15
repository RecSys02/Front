import MapPin from "@/assets/map-pin.svg?react";
import Row from "@/components/common/container/row";
import Subtitle from "@/components/text/subtitle";
import { ChevronRight } from "lucide-react";

const MyPlanName = () => {
    return(
        <Row className="w-197  h-26 flex items-center gap-4 px-11 pt-2">
            <MapPin className="w-12 h-12 stroke-width-1" />
            <Subtitle variant="subtitle2" className="flex items-center">서울역 여행</Subtitle>
            <ChevronRight size={48} className="rotate-270 ml-auto mr-4"/>
        </Row>
    );
};

export default MyPlanName;
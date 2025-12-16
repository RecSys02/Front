import MapPin from "@/assets/map-pin.svg?react";
import Row from "@/components/common/container/row";
import Heading from "@/components/text/heading";

const MyPlanName = () => {
    return(
        <Row className="w-fix h-20 flex items-center gap-4 pl-11">
            <MapPin className="w-12 h-12 stroke-width-1" />
            <Heading variant="heading2" className=" font-semibold items-center">서울역 여행</Heading>
            {/*<ChevronRight size={48} className="rotate-270 ml-auto mr-4"/>*/}
        </Row>
    );
};

export default MyPlanName;
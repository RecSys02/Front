import Column from "@/components/common/container/column";
import Heading from "@/components/text/heading";
import MyPlanAccordion from "./item/myplan-accordion";

const MyPlanSection = () => {
    return(
        <Column>
                <Heading variant="heading2" className="fc-gray-800 pl-2 pb-5">예정된 플랜</Heading>
                <MyPlanAccordion />
        </Column>
    );
};

export default MyPlanSection;
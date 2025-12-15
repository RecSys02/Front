import Row from "@/components/common/container/row"
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import TimeContainer from "./planner-time-container";
import ActivityContainer from "./planner-activity-container";

const DayContainer = () => {
    return(
        <Column className="overflow-hidden">
            <Row className="h-11 border-b border-r items-center px-2">
                <Body variant="body1" className="font-semibold fc-gray-900"> Day 1 </Body>
            </Row>
            
            <Row className="h-165">
                <TimeContainer />
                <ActivityContainer />
            </Row>
        </Column>
    );
};

export default DayContainer;
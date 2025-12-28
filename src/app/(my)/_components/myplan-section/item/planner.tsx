import Row from "@/components/common/container/row"
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import TimeContainer from "./planner-time-container";
import ActivityContainer from "./planner-activity-container";
import { Schedule } from "@/hooks/plan.hook";

const Planner = ( { dailySchedule }:{ dailySchedule : Schedule[] }) => {

    return(
        <Row className="w-fit border-l border-t">
        {dailySchedule.map((a,i) => 
        <Column className="w-fit overflow-hidden" key={i}>
            <Row className="h-11 border-b border-r items-center px-2">
                <Body variant="body1" className="font-semibold fc-gray-900"> Day {i+1} </Body>
            </Row>
            
            <Row className="h-165">
                <TimeContainer />
                <ActivityContainer activities={a.activities}/>
            </Row>
        </Column>)}
        </Row>
    );
};

export default Planner;
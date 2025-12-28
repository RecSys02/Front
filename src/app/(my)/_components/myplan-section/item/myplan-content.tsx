import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import { Button } from "@/components/common/button/button";
import Planner from "./planner";
import { PlanItem } from "@/hooks/plan.hook";

const MyPlanContent = ({ schedules }: PlanItem) => {
    
    return(
        <Column className="w-fit flex items-center gap-6 pb-5">
            <Border className="w-166"/>
            <Planner dailySchedule={schedules} />
            <Row className="justify-end pb-1 mr-2">
                <Button className="w-15 h-7 rounded-2xl bg-primary">
                    <Body variant="body2" className="fc-secondary font-semibold">삭제</Body>
                </Button>
            </Row>
        </Column>

    );
};

export default MyPlanContent;
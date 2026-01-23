import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import { Button } from "@/components/common/button/button";
import Planner from "./planner";
import { DailySchedule } from "@/types/plan/plan.type";

type Props = {
  schedule: DailySchedule[];
};

const MyPlanContent = ({ schedule }: Props) => {
  return (
    <Column className="w-fit flex items-center gap-3 pb-5">
      <Border className="w-full" />
      <Planner schedule={schedule} />
      <Row className="justify-end pb-1 mr-2">
        <Button className="w-15 h-7 rounded-2xl bg-primary">
          <Body variant="body2" className="fc-secondary font-semibold">
            삭제
          </Body>
        </Button>
      </Row>
    </Column>
  );
};

export default MyPlanContent;

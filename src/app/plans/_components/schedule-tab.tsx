import Planner from "@/app/(my)/_components/myplan-section/item/planner";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import { DailySchedule } from "@/types/plan/plan.type";

type Props = {
  schedule: DailySchedule[];
};

const ScheduleTab = ({ schedule }: Props) => {
  return (
    <Column className="gap-3 items-center ">
      <Body variant="body2" className="font-semibold">
        일정 요약
      </Body>
      {/* TODO: Planner develop */}
      <Planner schedule={schedule} />
    </Column>
  );
};

export default ScheduleTab;

import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import ActivityBlock from "./planner-activity-block";
import { DailySchedule } from "@/types/plan/plan.type";

type Props = {
  schedule: DailySchedule[];
};
const Planner = ({ schedule }: Props) => {
  return (
    <Row className="w-fit border-l border-t">
      {schedule.map((schedule, i) => (
        <Column className="w-fit overflow-hidden" key={i}>
          <Row className="h-11 border-b border-r items-center px-2">
            <Body variant="body1" className="font-semibold fc-gray-900">
              {" "}
              Day {i + 1}{" "}
            </Body>
          </Row>

          <Row className="h-165">
            <Column className="w-fit">
              {Array.from({ length: 15 }).map((_, i) => (
                <Row
                  key={i}
                  className="h-11 w-11 border-b border-r justify-center pt-1"
                >
                  <Body variant="body3" className="fc-gray-500">
                    {" "}
                    {8 + i}:00{" "}
                  </Body>
                </Row>
              ))}
            </Column>
            <div
              className="grid"
              style={{ gridTemplateRows: `repeat(16, 44px)` }}
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-43 h-11 border-b border-r" />
              ))}
              {schedule.activities.map((a, i) => (
                <ActivityBlock key={i} {...a} />
              ))}
            </div>
          </Row>
        </Column>
      ))}
    </Row>
  );
};

export default Planner;

import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import ActivityBar from "./planner-activity-bar";
import { DailySchedule } from "@/types/plan/plan.type";

type Props = {
  schedule: DailySchedule[];
};

const startHour = 8;
const endHour = 22;
const STEP = 1; // time table step
const HOURS = Array.from(
  { length: Math.floor((endHour - startHour) / STEP) + 1 },
  (_, i) => startHour + i * STEP
);

const LEGEND = [
  { key: "TOURSPOT", label: "관광지", color: "#CBE1B9" },
  { key: "RESTAURANT", label: "식당", color: "#FFDABE" },
  { key: "CAFE", label: "카페", color: "#FFECBC" },
];

const Planner = ({ schedule }: Props) => {
  return (
    <Column className="w-full my-3">

      <Row className="w-fit gap-4 mb-6">
        {LEGEND.map((item) => (
          <Row key={item.key} className="items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <Body variant="body3" className="text-sm fc-gray-700">
              {item.label}
            </Body>
          </Row>
        ))}
      </Row>

      <Row>
        <div className="w-14" />
        <div className="relative flex-1 border-b pb-1">
          <div className="flex justify-between text-xs text-gray-400">
            {HOURS.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
      </Row>

      {schedule.map((day, index) => (
        <div key={day.date} className="relative h-14">
          <div
            className="absolute w-16 px-2 font-semibold text-sm"
            style={{
              top: "100%",
              transform: "translateY(-50%)",
            }}
          >
            Day {index + 1}
          </div>

          <div className="ml-14 relative h-full border-b border-l">
            {day.activities.map((activity) => (
              <ActivityBar
                key={activity.placeId}
                {...activity}
                planStart={startHour}
                planEnd={endHour}
              />
            ))}
          </div>

        </div>
      ))}
      <div className="relative h-7">
        <div className="ml-14 h-full border-l" />
      </div>
    </Column>
  );
};

export default Planner;

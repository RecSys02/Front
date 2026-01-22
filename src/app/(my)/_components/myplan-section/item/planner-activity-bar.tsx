import Body from "@/components/text/body";
import { Activity } from "@/types/plan/plan.type";

type Props = Activity & {
    planStart: number;
    planEnd: number;
};

const CATEGORY_COLORS: Record<string, string> = {
    TOURSPOT: "bg-[#CBE1B9]",
    RESTAURANT: "bg-[#FFDABE]",
    CAFE: "bg-[#FFECBC]",
};

const getLeftPercent = (start: string, planStart: number, totalHours: number) => {
    const hour = Number(start.split(":")[0]);
    return ((hour - planStart) / totalHours) * 100;
};

const getWidthPercent = (start: string, end: string, totalHours: number) => {
    const s = Number(start.split(":")[0]);
    const e = Number(end.split(":")[0]);
    return ((e - s) / totalHours) * 100;
};

const ActivityBar = ({
    name,
    startTime,
    endTime,
    category,
    planStart,
    planEnd,
}: Props) => {
    const totalHours = planEnd - planStart;
    const left = getLeftPercent(startTime, planStart, totalHours);
    const width = getWidthPercent(startTime, endTime, totalHours);

    return (
        <div
            className="absolute"
            style={{
                left: `${left}%`,
                width: `${width}%`,
                top: "100%",
                transform: "translateY(-80%)",

            }}
        >
            <Body
                variant="body3"
                className="mb-1 text-xs font-medium truncate"
            >
                {name}
            </Body>

            <div
                className={`${CATEGORY_COLORS[category]} h-3 rounded-full`}
            />
        </div>
    );
};


export default ActivityBar;
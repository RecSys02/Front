import Body from "@/components/text/body";
import { Activity } from "@/types/plan/plan.type";

const CATEGORY_COLORS: Record<string, string> = {
    관광지 : "bg-[#CBE1B9]", // 초록
    식당 : "bg-[#FFDABE]", // 오렌지
    카페 : "bg-[#FFECBC]", // 노랑 --> tailwind 확인필요
};

const getRowStart = (time: string) => {
    const hour = Number(time.split(":")[0]);
    return hour - 8 + 1;
};

const getRowLength = (start: string, end: string) => {
    return Number(end.split(":")[0]) - Number(start.split(":")[0]);
};

const ActivityBlock = ({ name, startTime, endTime, category }: Activity ) => {
    const rowStart = getRowStart(startTime);
    const rowLength = getRowLength(startTime, endTime);
    return(
        <div
        className={`${CATEGORY_COLORS[category]} border-b border-r`}
        style={{ gridRow: `${rowStart} / span ${rowLength}`, }}
        >
            <Body variant="body2" className="fc-gray-700 font-medium pl-1"> {name} </Body>
        </div>
    );
};

export default ActivityBlock;
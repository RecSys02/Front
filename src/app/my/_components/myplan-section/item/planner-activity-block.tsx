import Body from "@/components/text/body";

const getRowStart = (time: string) => {
    const hour = Number(time.split(":")[0]);
    return hour - 8 + 1;
};

const getRowLength = (start: string, end: string) => {
    return Number(end.split(":")[0]) - Number(start.split(":")[0]);
};

const ActivityBlock = () => {
    //const rowStart = getRowStart(activity.start);
    const rowStart = 2
    //const rowLength = getRowLength(activity.start, activity.end);
    const rowLength = 3

    return(
        <div
        className="bg-base border-b border-r p-1"
        style={{ gridRow: `${rowStart} / span ${rowLength}`, }}
        >
            {/*{activity.name}*/}
            <Body variant="body2" className="font-medium pl-1"> row2-3h </Body>
        </div>
    );
};

export default ActivityBlock;
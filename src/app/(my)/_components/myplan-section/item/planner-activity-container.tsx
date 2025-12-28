import { Activity } from "@/hooks/plan.hook";
import ActivityBlock from "./planner-activity-block";

const ActivityContainer = ({ activities }:{ activities : Activity[] }) => {
    return(
        <div
        className="grid"
        style={{ gridTemplateRows: `repeat(16, 44px)`, }}
        >
            {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-43 h-11 border-b border-r"/>
            ))}
            {activities.map((a,i) => (
                <ActivityBlock key={i} {...a} />
            ))}
        </div>
    );
};

export default ActivityContainer;
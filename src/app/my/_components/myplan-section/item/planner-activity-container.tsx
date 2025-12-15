import ActivityBlock from "./planner-activity-block";

const ActivityContainer = () => {
    return(
        <div
        className="grid"
        style={{ gridTemplateRows: `repeat(16, 44px)`, }}
        >
            {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="w-43 h-11 border-b border-r"/>
            ))}
            {/*
            {activities.filter((s) => s.day === day).map((s) => (
                <ActivityBlock key={s.id} activity={s} />
            ))}
            */}
            <ActivityBlock />
        </div>
    );
};

export default ActivityContainer;
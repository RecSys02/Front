import Row from "@/components/common/container/row";
import DayContainer from "./planner-day-container";

const Planner = () => {
    const days = [1,2,3];

    return(
            <Row className="w-fit border-l border-t justify-start">
                {days.map((day) => (
                <DayContainer key={day}/>
                ))}
            </Row>

    )
}

export default Planner;
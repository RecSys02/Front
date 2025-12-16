import Column from "@/components/common/container/column";
import MyPlanTitle from "./item/myplan-title";
import MyPlanList from "./item/myplan-list";

const MyPlanSection = () => {
    return(
        <Column className="w-fit h-fit gap-4">
            <MyPlanTitle />
            <MyPlanList />
        </Column>

    );
};

export default MyPlanSection;
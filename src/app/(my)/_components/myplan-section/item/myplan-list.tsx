import Column from "@/components/common/container/column";
import MyPlanItem from "./myplan-item";
import MyPlanName from "./myplan-item-name";

const MyPlanList = () => {
    return(
        <Column className="w-fit items-center border border-primary rounded-2xl pb-4">
            {/* Accordion */}
            <MyPlanName />
            <MyPlanItem /> 
        </Column>

    );
};

export default MyPlanList;
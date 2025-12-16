import Column from "@/components/common/container/column";
import MyPlanItem from "./myplan-item";
import MyPlanName from "./myplan-item-name";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { MyPlanAccordionTrigger } from "./myplan-title-trigger";

const MyPlanList = () => {
    const plans = [1,2];

    return(
        <Column className="w-fit items-center border border-primary rounded-2xl">
            
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="1"
            >
                {plans.map((plan) => (
                <AccordionItem value={String(plan)}>
                    <MyPlanAccordionTrigger> 
                        <MyPlanName /> 
                    </MyPlanAccordionTrigger>
                    <AccordionContent className="flex justify-center">
                        <MyPlanItem /> 
                    </AccordionContent>
                </AccordionItem>
                ))}

            </Accordion>
        
        </Column>

    );
};

export default MyPlanList;
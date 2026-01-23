import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MyPlanContent from "./myplan-content";
import { MapPinIcon } from "lucide-react";
import { usePlanListByUser } from "@/hooks/plan.hook";
import Body from "@/components/text/body";

const MyPlanAccordion = () => {
  const { data } = usePlanListByUser();
  const plans = data ?? [];
  return (
    <Column className="min-w-200 items-center border border-primary rounded-2xl">
      <Accordion
        type="single"
        collapsible
        className="w-full mx-10"
        defaultValue="0"
      >
        {plans.map((plan, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger className="cursor-pointer [&>svg]:size-10 items-center pr-12 w-full">
              <Row className="h-17 flex items-center gap-4 pl-12 w-full">
                <MapPinIcon className="size-6" strokeWidth={1} />
                <Body className=" font-normal items-center fc-gray-800">
                  {plan.name}
                </Body>
              </Row>
            </AccordionTrigger>
            <AccordionContent className="flex justify-center">
              <MyPlanContent schedule={plan.schedule} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Column>
  );
};

export default MyPlanAccordion;

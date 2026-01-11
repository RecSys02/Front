import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Subtitle from "@/components/text/subtitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MyPlanContent from "./myplan-content";
import { MapPinIcon } from "lucide-react";
import { usePlanListByUser } from "@/hooks/plan.hook";

const MyPlanAccordion = () => {
  const { data } = usePlanListByUser();
  const plans = data ?? [];
  return (
    <Column className="w-fit items-center border border-primary rounded-2xl">
      <Accordion type="single" collapsible className="w-197" defaultValue="1">
        {plans.map((plan, i) => (
          <AccordionItem key={i} value={String(i)}>
            <AccordionTrigger className="cursor-pointer [&>svg]:size-10 items-center pr-12">
              <Row className="w-fix h-17 flex items-center gap-4 pl-12">
                <MapPinIcon className="w-10 h-10" strokeWidth={1} />
                <Subtitle
                  variant="subtitle2"
                  className=" font-normal items-center"
                >
                  {plan.name}
                </Subtitle>
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

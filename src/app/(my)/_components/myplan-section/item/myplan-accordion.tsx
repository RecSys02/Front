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
  const { data, isLoading, isFetching } = usePlanListByUser();

  return (
    <Column className="min-w-200 items-center border border-primary rounded-2xl">
      {isLoading ? (
        <Column className="py-20 items-center justify-center gap-2 min-h-140">
          <Body variant="body2" className="fc-gray-500">
            불러오는 중...
          </Body>
        </Column>
      ) : !data || data.length === 0 ? (
        <Column className="py-20 items-center justify-center gap-2 min-h-140">
          <MapPinIcon className="size-8 text-gray-300" />
          <Body variant="body2" className="fc-gray-500">
            아직 생성된 여행 계획이 없습니다.
          </Body>
          <Body variant="body3" className="fc-gray-400">
            여행 추천을 받아 나만의 계획을 만들어보세요.
          </Body>
        </Column>
      ) : (
        <>
          {isFetching && (
            <Row className="w-full justify-center py-3">
              <Body variant="body3" className="fc-gray-400">
                업데이트 중...
              </Body>
            </Row>
          )}

          <Accordion
            type="single"
            collapsible
            className="w-full mx-10"
            defaultValue="0"
          >
            {data.map((plan, i) => (
              <AccordionItem key={plan.id ?? i} value={String(i)}>
                <AccordionTrigger className="cursor-pointer [&>svg]:size-10 items-center pr-12 w-full">
                  <Row className="h-17 flex items-center gap-4 pl-12 w-full">
                    <MapPinIcon className="size-6" strokeWidth={1} />
                    <Body className="font-normal items-center fc-gray-800">
                      {plan.name}
                    </Body>
                  </Row>
                </AccordionTrigger>

                <AccordionContent className="flex justify-center">
                  <MyPlanContent
                    schedule={plan.schedule}
                    planId={plan.id}
                    isPrivate={plan.isPrivate}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </Column>
  );
};

export default MyPlanAccordion;

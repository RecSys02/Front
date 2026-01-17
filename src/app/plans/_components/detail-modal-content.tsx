import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlanListItem } from "@/types/plan/plan.wrapper.type";
import PlaceTab from "./place-tab";
import ScheduleTab from "./schedule-tab";

type Props = {
  content: PlanListItem;
};

const DetailModalContent = ({ content }: Props) => {
  return (
    <Tabs defaultValue="place" className="w-full h-full">
      <TabsList className="self-start mb-4">
        <TabsTrigger value="place">장소</TabsTrigger>
        <TabsTrigger value="schedule">일정</TabsTrigger>
      </TabsList>

      <TabsContent value="place">
        <PlaceTab key={content.id} content={content} />
      </TabsContent>

      <TabsContent value="schedule">
        <ScheduleTab schedule={content.schedule} />
      </TabsContent>
    </Tabs>
  );
};

export default DetailModalContent;

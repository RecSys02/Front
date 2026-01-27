import { useState } from "react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import { Button } from "@/components/common/button/button";
import Planner from "./planner";
import { DailySchedule } from "@/types/plan/plan.type";
import DeletePlanModal from "./delete-plan-modal";
import VisibilityModal from "./visibility-modal";

type Props = {
  planId: number;
  planName?: string;
  schedule: DailySchedule[];
  isPrivate: boolean;
};

const MyPlanContent = ({ planId, schedule, isPrivate }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openVisibility, setOpenVisibility] = useState(false);

  return (
    <>
      <Column className="w-fit flex items-center gap-3 pb-5">
        <Border className="w-full" />
        <Planner schedule={schedule} />

        <Row className="justify-end pb-1 mr-2 gap-2">
          <Button
            className="w-15 h-7 rounded-2xl bg-primary"
            onClick={() => setOpenVisibility(true)}
          >
            <Body variant="body2" className="fc-secondary font-semibold!">
              {isPrivate ? "비공개" : "공개"}
            </Body>
          </Button>

          <Button
            className="w-15 h-7 rounded-2xl bg-white border border-gray-200"
            onClick={() => setOpenDelete(true)}
          >
            <Body variant="body2" className="text-gray-700 font-semibold!">
              삭제
            </Body>
          </Button>
        </Row>
      </Column>

      <VisibilityModal
        open={openVisibility}
        onOpenChange={setOpenVisibility}
        planId={planId}
        isPrivate={isPrivate}
      />

      <DeletePlanModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        planId={planId}
      />
    </>
  );
};

export default MyPlanContent;

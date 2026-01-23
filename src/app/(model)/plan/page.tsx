import Planner from "@/app/(my)/_components/myplan-section/item/planner";
import { useReadPlan } from "@/hooks/plan.hook";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import Column from "@/components/common/container/column";
import Subtitle from "@/components/text/subtitle";

const ModelPlanPage = () => {
  const { planId } = useParams({ strict: false });
  const { data, isLoading } = useReadPlan(Number(planId));

  return (
    <Column className="min-h-150 flex items-center mt-30">
      {isLoading ? (
        <Spinner className="size-12" />
      ) : (
        <>
          <Subtitle variant="subtitle2" className="pb-10 font-bold!">
            {data?.name}
          </Subtitle>
          <div className="w-180">
            <Planner schedule={data?.schedule ?? []} />
          </div>
        </>
      )}
    </Column>
  );
};

export default ModelPlanPage;

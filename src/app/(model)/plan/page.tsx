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
    <Column className="min-h-dvh flex items-center justify-center">
      {isLoading ? (
        <Spinner className="size-12" />
      ) : (
        <>
          <Subtitle variant="subtitle2" className="pb-10 font-bold!">
            {data?.name}
          </Subtitle>
          <Planner schedule={data?.schedule ?? []} />
        </>
      )}
    </Column>
  );
};

export default ModelPlanPage;

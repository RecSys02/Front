import Column from "@/components/common/container/column";
import { usePlanList } from "@/hooks/plan.hook";
import PreviewCard from "./_components/privew-card";

const PlanPage = () => {
  const { data: contents } = usePlanList();

  return (
    <Column className="flex-1">
      {contents?.map((content, idx) => (
        <PreviewCard key={`${content.name}-${idx}`} content={content} />
      ))}
    </Column>
  );
};

export default PlanPage;

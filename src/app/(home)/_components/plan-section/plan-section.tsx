import Column from "@/components/common/container/column";
import PlanTitle from "./item/plan-title";
import ContentCardList from "./item/content-card-list";

const PlanSection = () => {
  return (
    <Column className="py-20">
      <PlanTitle />
      <ContentCardList />
    </Column>
  );
};

export default PlanSection;

import Column from "@/components/common/container/column";
import PlanTitle from "./item/plan-title";
import ContentCardList from "./item/content-card-list";
import { Surface } from "@/components/ui/surface";

const PlanSection = () => {
  return (
    <Surface className="bg-secondary">
      <Column className="pt-10 pb-30">
        <PlanTitle />
        <ContentCardList />
      </Column>
    </Surface>
  );
};

export default PlanSection;

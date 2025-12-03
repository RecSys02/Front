import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import Title from "@/components/text/title";

const PlanTitle = () => {
  return (
    <Column className="w-full px-37.5 justify-start">
      <Title className="font-extrabold">요즘 뜨는 PLAN</Title>
      <Body>많은 사용자가 추천한 여행 일정을 만나보세요</Body>
    </Column>
  );
};

export default PlanTitle;

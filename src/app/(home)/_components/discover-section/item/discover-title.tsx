import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import Title from "@/components/text/title";

const DiscoverTitle = () => {
  return (
    <Column className="pl-37.5 justify-start">
      <Title className="font-extralight">
        어슬렁, <span className="fc-accent font-black">추천코스</span>
      </Title>
      <Body>취향따라, 인기따라 여행지를 골라드릴게요</Body>
    </Column>
  );
};

export default DiscoverTitle;

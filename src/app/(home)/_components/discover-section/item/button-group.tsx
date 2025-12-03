import Row from "@/components/common/container/row";
import DiscoverButton from "./discover-button";
import { DiscoverTab } from "./button-item";

type Props = {
  activeTab: string;
  onChangeTab: (tab: DiscoverTab) => void;
};
const ButtonGroup = ({ activeTab, onChangeTab }: Props) => {
  return (
    <Row className="pt-14 gap-80 justify-center">
      <DiscoverButton
        isActive={activeTab === "AI"}
        onClick={() => onChangeTab("AI")}
        name="AI 여행지 추천"
        description={`취향 태그 따라 자동으로\n여행지 추천`}
      />
      <DiscoverButton
        isActive={activeTab === "HOT"}
        onClick={() => onChangeTab("HOT")}
        name="HOT PLACE 추천"
        description={`지도 리뷰 기반으로\n여행지 추천`}
      />
    </Row>
  );
};

export default ButtonGroup;

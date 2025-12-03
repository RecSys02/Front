import Column from "@/components/common/container/column";
import DiscoverTitle from "./item/discover-title";
import ButtonGroup from "./item/button-group";
import { useState } from "react";
import { DiscoverTab } from "./item/button-item";
import TrainIcon from "@/assets/train.svg?react";
import OnboardingCarouselSection from "./item/onboarding-carousel-section";

const DiscoverSection = () => {
  const [activeTab, setActiveTab] = useState<DiscoverTab>("AI");

  return (
    <Column className="relative">
      <DiscoverTitle />
      <ButtonGroup activeTab={activeTab} onChangeTab={setActiveTab} />

      <TrainIcon className="self-end mr-37.5 w-67.5 absolute pt-60" />

      {activeTab === "AI" ? <OnboardingCarouselSection /> : null}
    </Column>
  );
};

export default DiscoverSection;

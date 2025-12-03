import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import Row from "@/components/common/container/row";
import { DescriptionCarousel } from "./description-carousel";
import { ImageCarousel } from "./image-carousel";
import { ONBOARDING_STEPS } from "./onboarding-step";

const OnboardingCarouselSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();
  const handleDotClick = (idx: number) => api?.scrollTo(idx);

  return (
    <Row className="flex gap-10 px-85 py-20 pt-30">
      <DescriptionCarousel
        step={ONBOARDING_STEPS[currentIdx]}
        currentIdx={currentIdx}
        total={ONBOARDING_STEPS.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <ImageCarousel
        items={ONBOARDING_STEPS}
        currentIdx={currentIdx}
        setIdx={setCurrentIdx}
        setApi={setApi}
        onDotClick={handleDotClick}
      />
    </Row>
  );
};

export default OnboardingCarouselSection;

import Column from "@/components/common/container/column";
import CarouselIndicator from "./item/carousel-indicator";
import { useCallback, useEffect, useRef, useState } from "react";
import { AUTOPLAY_DELAY, BANNER_ITEMS } from "./item/banner-item";
import BannerCarousel from "./item/banner-carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { Surface } from "@/components/ui/surface";
import Row from "@/components/common/container/row";
import TitleCarousel from "./item/tite-carousel";

const BannerSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const [titleApi, setTitleApi] = useState<CarouselApi | null>(null);
  const [bannerApi, setBannerApi] = useState<CarouselApi | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearInterval(autoplayRef.current);
    }

    if (!isPaused && bannerApi) {
      autoplayRef.current = window.setInterval(() => {
        bannerApi.scrollNext();
      }, AUTOPLAY_DELAY);
    }
  }, [isPaused, bannerApi]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current !== null) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [resetAutoplay]);

  const handleBannerChange = (index: number) => {
    setCurrentIdx(index);
    titleApi?.scrollTo(index);
    resetAutoplay();
  };

  const handleTitleChange = (index: number) => {
    setCurrentIdx(index);
    bannerApi?.scrollTo(index);
    resetAutoplay();
  };

  const handlePrev = () => {
    bannerApi?.scrollPrev();
    resetAutoplay();
  };

  const handleNext = () => {
    bannerApi?.scrollNext();
    resetAutoplay();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const colorClass = BANNER_ITEMS[currentIdx].color;

    const tempEl = document.createElement("div");
    tempEl.className = colorClass;
    document.body.appendChild(tempEl);

    const bgColor = window.getComputedStyle(tempEl).backgroundColor;

    document.body.removeChild(tempEl);

    document.documentElement.style.setProperty("--banner-color", bgColor);
  }, [currentIdx]);

  return (
    <Surface className={`${BANNER_ITEMS[currentIdx].color} relative`}>
      <Column className="w-full relative">
        <Row className="pl-122 relative z-10">
          <TitleCarousel setIdx={handleTitleChange} setApi={setTitleApi} />
          <BannerCarousel setIdx={handleBannerChange} setApi={setBannerApi} />
        </Row>

        <CarouselIndicator
          current={currentIdx}
          total={BANNER_ITEMS.length}
          onPrev={handlePrev}
          onNext={handleNext}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      </Column>
    </Surface>
  );
};

export default BannerSection;

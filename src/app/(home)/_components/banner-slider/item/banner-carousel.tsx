import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BANNER_ITEMS } from "./banner-item";
import { ImageBox } from "@/components/common/container/image-box";

type Props = {
  setIdx: (index: number) => void;
  setApi: (api: CarouselApi) => void;
};

const BannerCarousel = ({ setIdx, setApi }: Props) => {
  return (
    <Carousel
      onSlideChange={(index) => setIdx(index)}
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        duration: 40,
      }}
      className="w-240 pt-20 overflow-visible"
    >
      <CarouselContent className="-ml-4">
        {BANNER_ITEMS.map((banner, i) => (
          <CarouselItem key={i} className="w-210 pr-8">
            <ImageBox
              src={banner.imgSrc}
              className="w-full h-132"
              fit="cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BannerCarousel;

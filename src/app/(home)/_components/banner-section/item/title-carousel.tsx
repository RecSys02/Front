import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BANNER_ITEMS } from "./banner-item";
import Column from "@/components/common/container/column";
import Heading from "@/components/text/heading";
import { Pill } from "@/components/ui/pill";
import { Link } from "@tanstack/react-router";

type Props = {
  setIdx: (index: number) => void;
  setApi: (api: CarouselApi) => void;
};

const TitleCarousel = ({ setIdx, setApi }: Props) => {
  return (
    <Carousel
      onSlideChange={setIdx}
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        duration: 40,
      }}
      className="w-116 pt-30 pr-23"
    >
      <CarouselContent>
        {BANNER_ITEMS.map((banner, i) => (
          <CarouselItem key={i} className="basis-auto grow-0 shrink-0">
            <Column className="w-fit flex justify-start">
              <Pill iconSrc={banner.iconSrc} className="text-body2 w-fit">
                {banner.description}
              </Pill>
              <Heading className="whitespace-pre-wrap w-94 pt-13 pb-6 fc-gray-800 leading-13! font-semibold">
                {banner.title}
              </Heading>
              {banner.linkTo && (
                <Link
                  to={banner.linkTo}
                  className="text-body3 font-light underline"
                >
                  자세히 보기
                </Link>
              )}
            </Column>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default TitleCarousel;

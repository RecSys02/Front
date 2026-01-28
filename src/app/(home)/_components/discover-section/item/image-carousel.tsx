import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ImageBox } from "@/components/common/container/image-box";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";

type Props = {
  items: {
    image: string;
  }[];
  currentIdx: number;
  setIdx: (index: number) => void;
  setApi: (api: CarouselApi) => void;
  onDotClick: (idx: number) => void;
};

export const ImageCarousel = ({
  items,
  currentIdx,
  setIdx,
  setApi,
  onDotClick,
}: Props) => {
  return (
    <Column className="flex justify-center items-center gap-8">
      <Carousel
        onSlideChange={(index) => setIdx(index)}
        setApi={setApi}
        opts={{
          loop: true,
          slidesToScroll: 1,
          containScroll: "trimSnaps",
          duration: 40,
        }}
        className="w-174 overflow-visible"
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i} className="w-174">
              <ImageBox
                src={item.image}
                className="w-full h-88 overflow-hidden rounded-3xl bg-gray-100"
                fit="cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Row className="justify-center items-center gap-2 h-2">
        {items.map((_, i) => {
          const isActive = i === currentIdx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onDotClick(i)}
              className={`h-2 rounded-full transition-all ${
                isActive ? "w-6 bg-gray-700" : "w-2 bg-gray-300"
              }`}
            />
          );
        })}
      </Row>
    </Column>
  );
};

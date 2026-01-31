import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { cn } from "@/libs/utils";

type CarouselImageItem = {
  image: string;
  bgColor?: string;
};

type Props = {
  items: CarouselImageItem[];
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
              <div
                className="relative w-full h-88 rounded-3xl flex items-center justify-center"
                style={{
                  backgroundColor: item.bgColor ?? "#FAFAF9",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-[76%] h-[76%] object-contain"
                />
              </div>
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
              className={cn(
                "h-2 rounded-full transition-all",
                isActive ? "w-6 bg-gray-700" : "w-2 bg-gray-300",
              )}
            />
          );
        })}
      </Row>
    </Column>
  );
};

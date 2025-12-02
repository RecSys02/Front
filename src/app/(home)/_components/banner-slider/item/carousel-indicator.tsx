import { Button } from "@/components/common/button/button";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Progress } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import { ArrowLeft, ArrowRight, Pause, PlayIcon } from "lucide-react";

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;
};

const CarouselIndicator = ({
  current,
  total,
  onPrev,
  onNext,
  isPaused,
  setIsPaused,
}: Props) => {
  const currentIdx = current + 1;
  const progress = (currentIdx / total) * 100;

  return (
    <Surface className="w-full flex items-center h-20 bg-white absolute bottom-0">
      <Row className="px-122">
        <Row className="flex items-center justify-center w-fit gap-13">
          <Row className="flex items-center tracking-wider">
            <Progress value={progress} />
            <Body variant="body3" className="font-semibold pl-4">
              {String(currentIdx).padStart(2, "0")}
            </Body>
            <Body variant="body3" className="opacity-50">
              /{String(total).padStart(2, "0")}
            </Body>
          </Row>

          <Row className="flex items-center justify-center gap-4 z-20">
            <Button
              onClick={onPrev}
              className="text-gray-600 hover:text-black transition bg-white px-0!"
            >
              <ArrowLeft size={16} />
            </Button>

            <Button
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-600 hover:text-black transition bg-white px-0!"
            >
              {isPaused ? <PlayIcon size={14} /> : <Pause size={14} />}
            </Button>

            <Button
              onClick={onNext}
              className="text-gray-600 hover:text-black transition bg-white px-0!"
            >
              <ArrowRight size={16} />
            </Button>
          </Row>
        </Row>
      </Row>
    </Surface>
  );
};

export default CarouselIndicator;

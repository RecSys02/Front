import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/button/button";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Pill } from "@/components/ui/pill";
import Subtitle from "@/components/text/subtitle";
import Heading from "@/components/text/heading";
import { Surface } from "@/components/ui/surface";
import Column from "@/components/common/container/column";

type Props = {
  step: {
    title: string;
    subTitle: string;
    description: string;
  };
  currentIdx: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

export const DescriptionCarousel = ({
  step,
  currentIdx,
  total,
  onPrev,
  onNext,
}: Props) => {
  return (
    <Surface className="w-126 h-100 rounded-4xl bg-surface p-10 shadow-sm flex flex-col justify-between">
      <Column className="gap-2 w-106">
        <Pill className="w-fit rounded-full bg-white py-1">
          <span className="fc-accent font-bold text-body3">
            STEP {currentIdx + 1}
          </span>
        </Pill>
        <Heading
          variant="heading2"
          className="font-extrabold fc-emphasis w-fit"
        >
          {step.title}
        </Heading>
        <Subtitle
          variant="subtitle2"
          className="mb-4 font-bold opacity-70 w-fit"
        >
          {step.subTitle}
        </Subtitle>
        <Body
          variant="body2"
          className="leading-8! opacity-60 whitespace-normal"
        >
          {step.description}
        </Body>
      </Column>
      <Row className="flex items-center justify-between">
        <Body className="text-xs text-gray-400">
          {currentIdx + 1} / {total}
        </Body>
        <Row className="flex gap-5 w-fit">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={onPrev}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={onNext}
          >
            <ArrowRight className="size-4" />
          </Button>
        </Row>
      </Row>
    </Surface>
  );
};

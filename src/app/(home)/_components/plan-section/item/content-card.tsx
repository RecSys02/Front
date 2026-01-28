import Column from "@/components/common/container/column";
import { ImageBox } from "@/components/common/container/image-box";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import Heading from "@/components/text/heading";
import { HeartIcon } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { PopularPlanCardDto } from "@/types/plan/plan.wrapper.type";
import { useTogglePlanLike } from "@/hooks/plan.hook";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";

type Props = {
  content: PopularPlanCardDto;
};

const ContentCard = ({ content }: Props) => {
  const toggleLike = useTogglePlanLike();
  const navigate = useNavigate();

  const handleLikeToggle = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (toggleLike.isPending) return;

    toggleLike.mutate({
      planId: content.id,
      like: !content.isActive,
    });
  };

  const handleNavigate = () => {
    navigate({
      to: ROUTES.PlanDetail,
      params: { planId: String(content.id) },
    });
  };

  return (
    <Column className="w-full px-5.5 pt-20">
      <div
        onClick={handleNavigate}
        className="cursor-pointer hover:opacity-95 transition-opacity w-fit"
      >
        <ImageBox
          src={content.image}
          className="w-140 h-80 overflow-hidden"
          fit="cover"
        />
      </div>

      <div className="w-140 h-15 pt-6 px-2.5 grid grid-cols-[150px_1fr_auto] items-center gap-3">
        {/* LEFT */}
        <Row className="w-full h-full gap-3 items-center justify-between pr-3">
          <Body variant="body3" className="w-fit font-medium">
            POPULAR
          </Body>
          <Border className="w-full" />
        </Row>

        {/* TITLE (ellipsis) */}
        <Heading
          variant="heading2"
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-bold fc-gray-800"
        >
          {content.name}
        </Heading>

        {/* RIGHT (fixed, never shrink) */}
        <Row className="flex-none shrink-0 items-center gap-3 justify-end">
          <HeartIcon
            onClick={handleLikeToggle}
            className={`w-6 h-6 shrink-0 text-red-500 hover:scale-110 cursor-pointer transition-transform ${
              content.isActive ? "fill-red-500" : "fill-transparent"
            }`}
          />
          <Body variant="body2" className="shrink-0 fc-gray-800 font-semibold">
            {content.likeCount > 99 ? "99+" : content.likeCount}
          </Body>
        </Row>
      </div>

      <Row className="pl-40 py-2.5 gap-x-3 gap-y-1.5 w-140 flex-wrap">
        {content.tags.map((tag, i) => (
          <Pill
            key={i}
            className="w-fit py-0 bg-white border border-gray-300 rounded-full"
          >
            <span className="text-body3 font-light text-gray-500">#{tag}</span>
          </Pill>
        ))}
      </Row>
    </Column>
  );
};

export default ContentCard;

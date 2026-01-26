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

  const handleLikeToggle = () => {
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
          src={content.imgSrc}
          className="w-140 h-80 overflow-hidden"
          fit="cover"
        />
      </div>

      <Row className="w-140 h-15 items-center pt-6 px-2.5">
        <Row className="w-37.5 shrink-0 h-full gap-3 items-center justify-between pr-3">
          <Body variant="body3" className="w-fit font-medium">
            POPULAR
          </Body>
          <Border className="w-full" />
        </Row>

        <Heading
          variant="heading2"
          className="w-full flex items-center font-bold fc-gray-800 line-clamp-1 mr-10"
        >
          {content.name}
        </Heading>

        <Row className="w-16 shrink-0 gap-3 justify-start items-center">
          <HeartIcon
            onClick={handleLikeToggle}
            className={`w-6 h-6 text-red-500 hover:scale-110 cursor-pointer transition-transform ${
              content.isActive ? "fill-red-500" : "fill-transparent"
            }`}
          />
          <Body variant="body2" className="w-fit fc-gray-800 font-semibold">
            {content.likeCount > 99 ? "99+" : content.likeCount}
          </Body>
        </Row>
      </Row>

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

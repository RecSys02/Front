import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import { ImageBox } from "@/components/common/container/image-box";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { useTogglePlanLike } from "@/hooks/plan.hook";
import { HeartIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import { Plan } from "@/types/plan/plan.type";
import { mapProvinceToKorean } from "@/libs/utils";

type Props = {
  content: Plan;
};

const PreviewCard = ({ content }: Props) => {
  const toggleLike = useTogglePlanLike();
  const handleLikeToggle = () => {
    if (!content) return;
    if (toggleLike.isPending) return;

    toggleLike.mutate({
      planId: content.id,
      like: !content.isActive,
    });
  };

  return (
    <Column className="w-fit">
      <div className="relative size-55">
        <ImageBox
          src={content.image}
          className="w-full h-full overflow-hidden rounded-lg"
          fit="cover"
        />
        <Button
          onClick={handleLikeToggle}
          className="absolute top-3 right-3 z-10 bg-white rounded-full size-7"
        >
          <HeartIcon
            className={`w-6 h-6 text-red-500 transition-transform hover:scale-110 ${
              content.isActive ? "fill-red-500" : "fill-transparent"
            }`}
          />
        </Button>
      </div>

      <Column className="max-w-55 w-full h-fit justify-start pt-4 px-2.5">
        <Body
          variant="body2"
          className="w-full min-w-0 flex items-center font-bold fc-gray-800 truncate"
        >
          {content.name}
        </Body>

        <Row className="w-full items-center justify-between gap-2">
          <Body
            variant="body3"
            className="min-w-0 flex-1 flex items-center font-regular fc-gray-700 truncate"
          >
            {mapProvinceToKorean(content.province)}
          </Body>

          <Link
            to={ROUTES.PlanDetail}
            params={{ planId: String(content.id) }}
            className="shrink-0 text-[12px]! font-regular fc-gray-600 underline"
          >
            더보기
          </Link>
        </Row>
      </Column>
    </Column>
  );
};

export default PreviewCard;

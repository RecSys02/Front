import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import { ImageBox } from "@/components/common/container/image-box";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { useTogglePlanLike } from "@/hooks/plan.hook";
import { PlanListItem } from "@/types/plan/plan.wrapper.type";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import DetailModal from "./detail-modal";

type Props = {
  content: PlanListItem;
};

const PreviewCard = ({ content }: Props) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const toggleLike = useTogglePlanLike();
  const handleLikeToggle = () => {
    toggleLike.mutate({
      planId: content.id,
      like: !content.isActive,
    });
  };

  return (
    <Column className="w-fit">
      <div className="relative size-55">
        <ImageBox
          src={content.imgSrc}
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

      <Column className="w-55 h-fit justify-start pt-4 px-2.5">
        <Body
          variant="body2"
          className="w-full flex items-center font-bold fc-gray-800"
        >
          {content.name}
        </Body>
        <Row className="justify-between items-center">
          <Body
            variant="body3"
            className="w-full flex items-center font-regular fc-gray-700"
          >
            {content.province}
          </Body>
          <Button
            onClick={() => setOpenDetailModal(true)}
            className="text-[12px]! font-regular fc-gray-600 underline size-3"
          >
            더보기
          </Button>
        </Row>
      </Column>
      <DetailModal
        open={openDetailModal}
        onOpenChange={setOpenDetailModal}
        content={content}
      />
    </Column>
  );
};

export default PreviewCard;

import Modal from "@/components/ui/modal";
import { PlanListItem } from "@/types/plan/plan.wrapper.type";
import DetailModalContent from "./detail-modal-content";
import Subtitle from "@/components/text/subtitle";
import Body from "@/components/text/body";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: PlanListItem;
};

const DetailModal = ({ open, onOpenChange, content }: Props) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <>
          <Subtitle className="h-12 w-auto mx-auto mt-2 font-extrabold fc-gray-800">
            {content.name}
          </Subtitle>
          <Body variant="body2" className="fc-gray-700">
            {content.province}
          </Body>
        </>
      }
      description={<DetailModalContent content={content} />}
      ctaText="닫기"
      onCtaClick={() => onOpenChange(false)}
      contentClassName="max-w-160! h-200 overflow-hidden"
    />
  );
};
export default DetailModal;

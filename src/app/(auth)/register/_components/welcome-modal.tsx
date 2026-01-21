import Modal from "@/components/ui/modal";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Body from "@/components/text/body";
import Column from "@/components/common/container/column";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

const WelcomeModal = ({ open, onOpenChange, onClose }: Props) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-2 items-center text-center">
          <Body variant="body1" className="font-semibold">
            회원가입이 완료되었습니다.
          </Body>
          <Body variant="body2" className="font-medium text-gray-600">
            어슬렁과 함께 나만의 여행을 시작해보세요.
          </Body>
        </Column>
      }
      ctaText="닫기"
      onCtaClick={onClose}
    />
  );
};

export default WelcomeModal;

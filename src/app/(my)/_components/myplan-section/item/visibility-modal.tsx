import Modal from "@/components/ui/modal";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import BrandLogo from "@/assets/logos/logo.svg?react";
import { usePlanVisibility } from "@/hooks/plan.hook";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: number;
  isPrivate: boolean;
};

const VisibilityModal = ({ open, onOpenChange, planId, isPrivate }: Props) => {
  const visibility = usePlanVisibility();
  const isLoading = visibility.isPending;

  const nextPrivate = !isPrivate;

  const handleConfirm = () => {
    visibility.mutate(
      {
        params: { planId },
        query: { isPrivate: nextPrivate },
        body: undefined,
      },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  const titleText = nextPrivate ? "비공개로 전환할까요?" : "공개로 전환할까요?";
  const descText = nextPrivate
    ? "비공개로 전환하면 다른 사용자에게 보이지 않아요."
    : "공개로 전환하면 다른 사용자에게 표시될 수 있어요.";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-3 items-center text-center">
          <Body variant="body1" className="font-semibold">
            {titleText}
          </Body>
          <Body variant="body3" className="text-gray-500">
            {descText}
          </Body>
        </Column>
      }
      cancelText="취소"
      onCancelClick={() => onOpenChange(false)}
      ctaText={isLoading ? "변경 중..." : "전환"}
      isLoading={isLoading}
      onCtaClick={handleConfirm}
    />
  );
};

export default VisibilityModal;

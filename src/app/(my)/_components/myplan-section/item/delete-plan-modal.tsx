import Modal from "@/components/ui/modal";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import BrandLogo from "@/assets/logos/logo.svg?react";
import { useRemovePlan } from "@/hooks/plan.hook";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: number;
};

const DeletePlanModal = ({ open, onOpenChange, planId }: Props) => {
  const removePlan = useRemovePlan();
  const isLoading = removePlan.isPending;

  const handleDelete = async () => {
    try {
      await removePlan.mutateAsync({ params: { planId } } as any);
      onOpenChange(false);
      // eslint-disable-next-line no-empty
    } catch {}
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-3 items-center text-center">
          <Body variant="body1" className="font-semibold">
            여행 계획을 삭제할까요?
          </Body>
          <Body variant="body3" className="text-gray-500">
            삭제한 계획은{" "}
            <span className="font-semibold text-red-500">
              되돌릴 수 없어요.
            </span>
          </Body>
        </Column>
      }
      cancelText="취소"
      onCancelClick={() => onOpenChange(false)}
      ctaText={isLoading ? "삭제 중..." : "삭제"}
      isLoading={isLoading}
      onCtaClick={handleDelete}
    />
  );
};

export default DeletePlanModal;

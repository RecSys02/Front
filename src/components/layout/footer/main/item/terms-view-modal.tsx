import Modal from "@/components/ui/modal";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Column from "@/components/common/container/column";
import Body from "@/components/text/body";
import { TERMS_OF_SERVICE } from "@/constants/policy";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TermsViewModal = ({ open, onOpenChange }: Props) => {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-3">
          <Body variant="body1" className="font-semibold">
            이용약관
          </Body>

          <div className="h-120 overflow-y-auto rounded-lg border p-4 whitespace-pre-wrap">
            <Body variant="body3" className="fc-gray-700 leading-6">
              {TERMS_OF_SERVICE}
            </Body>
          </div>
        </Column>
      }
      ctaText="닫기"
      onCtaClick={() => onOpenChange(false)}
      enableOutsideClick
      contentClassName="max-w-2xl"
    />
  );
};

export default TermsViewModal;

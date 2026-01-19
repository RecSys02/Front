import { useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/common/button/button";
import { cn } from "@/libs/utils";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "@/constants/policy";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const PolicyModal = ({ open, onOpenChange, onConfirm }: Props) => {
  const [tos, setTos] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const allChecked = useMemo(() => tos && privacy, [tos, privacy]);

  const handleToggleAll = (next: boolean) => {
    setTos(next);
    setPrivacy(next);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      noPadding
      noFooter
      enableOutsideClick
      contentClassName="max-w-2xl"
      content={
        <Column className="gap-4 px-6 pb-6">
          <Row className="items-center gap-2">
            <Checkbox
              checked={allChecked}
              onCheckedChange={(v) => handleToggleAll(Boolean(v))}
            />
            <Body variant="body2" className="font-semibold">
              전체 동의
            </Body>
          </Row>

          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Checkbox
                checked={tos}
                onCheckedChange={(v) => {
                  const next = Boolean(v);
                  setTos(next);
                }}
              />
              <Body variant="body2" className="font-semibold">
                이용약관 동의 (필수)
              </Body>
            </Row>

            <div className="h-56 overflow-y-auto rounded-lg border p-4 whitespace-pre-wrap">
              <Body variant="body3" className="fc-gray-700 leading-6">
                {TERMS_OF_SERVICE}
              </Body>
            </div>
          </Column>

          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Checkbox
                checked={privacy}
                onCheckedChange={(v) => {
                  const next = Boolean(v);
                  setPrivacy(next);
                }}
              />
              <Body variant="body2" className="font-semibold">
                개인정보 처리방침 동의 (필수)
              </Body>
            </Row>

            <div className="h-56 overflow-y-auto rounded-lg border p-4 whitespace-pre-wrap">
              <Body variant="body3" className="fc-gray-700 leading-6">
                {PRIVACY_POLICY}
              </Body>
            </div>
          </Column>

          <Row className="justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="min-w-28"
            >
              닫기
            </Button>

            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              disabled={!allChecked}
              className={cn(
                "min-w-28 bg-emphasis text-white!",
                !allChecked && "opacity-60",
              )}
            >
              동의하고 계속
            </Button>
          </Row>
        </Column>
      }
    />
  );
};

export default PolicyModal;

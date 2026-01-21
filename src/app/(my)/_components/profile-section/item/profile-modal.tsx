import Modal from "@/components/ui/modal";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Body from "@/components/text/body";
import Column from "@/components/common/container/column";
import { useEffect, useState } from "react";
import { useRename, useUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useCheckName, useDeleteUser } from "@/hooks/auth.hook";
import { ApiOk } from "@/types/util.type";
import { AvailabilityResponse } from "@/types/auth/auth.type";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

export const RenameModal = ({ open, onOpenChange, onClose }: Props) => {
  const { data } = useUser();
  const [nickname, setNickname] = useState("");

  const checkUserName = useCheckName();
  const rename = useRename();

  useEffect(() => {
    if (data?.userName) {
      setNickname(data?.userName);
    }
  }, [open])

  const handleSaveName = () => {
    const userName = nickname.trim();

    if (!userName || userName == data?.userName) {
      toast.error(!userName ? "변경하실 닉네임을 입력해주세요." : "현재와 동일한 닉네임입니다.");
      return;
    }

    checkUserName.mutate(
      { body: { userName } },
      {
        onSuccess: (res: ApiOk<AvailabilityResponse>) => {
          if (res.body.available) {
            rename.mutate({ body: { userName: userName } }, {
              onSuccess: () => {
                onClose();
                toast.success("닉네임이 성공적으로 변경되었습니다.");
              }
            })
          } else {
            toast.error("이미 사용 중인 닉네임입니다.");
          }
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-2">
          <Body variant="body1" className="font-semibold">
            닉네임 변경
          </Body>
          <Body variant="body2" className="font-medium text-gray-600">
            사용하실 닉네임을 입력해주세요.
          </Body>
          <Input type="text" className="rounded border border-gray-300 p-2" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Column>
      }
      cancelText="취소"
      onCancelClick={onClose}
      ctaText="변경하기"
      onCtaClick={handleSaveName} />
  );
};

export const DeleteUserModal = ({ open, onOpenChange, onClose }: Props) => {
  const delUser = useDeleteUser();

  const handleDeletUser = () => {
    delUser.mutate({ body: {} }, {
      onSuccess: () => {
        toast.success("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.")
        window.location.href = "/";
      }
    });
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-2">
          <Body variant="body1" className="font-semibold">
            정말 탈퇴하시겠습니까?
          </Body>
          <Body variant="body2" className="font-medium text-gray-600">
            저장하신 여행 정보가 모두 사라지며,
            {'\n'}삭제된 데이터는 다시 복구할 수 없습니다.
          </Body>
        </Column>
      }
      cancelText="취소"
      onCancelClick={onClose}
      ctaText="탈퇴하기"
      onCtaClick={handleDeletUser} />
  );
};
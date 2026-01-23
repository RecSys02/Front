import Modal from "@/components/ui/modal";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Body from "@/components/text/body";
import Column from "@/components/common/container/column";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMemo, useRef } from "react";

import { useRename, useUser } from "@/hooks/user.hook";
import { useCheckName, useSignout } from "@/hooks/auth.hook";
import type { ApiOk } from "@/types/util.type";
import type { AvailabilityResponse } from "@/types/auth/auth.type";

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

export const RenameModal = ({ open, onClose }: ProfileModalProps) => {
  const { data } = useUser();

  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const checkUserName = useCheckName();
  const rename = useRename();

  const isLoading = checkUserName.isPending || rename.isPending;

  const nicknameKey = useMemo(
    () => `nickname-${open ? "open" : "closed"}-${data?.userName ?? ""}`,
    [open, data?.userName],
  );
  const passwordKey = useMemo(
    () => `password-${open ? "open" : "closed"}`,
    [open],
  );

  const handleSaveName = async () => {
    const userName = (nicknameRef.current?.value ?? "").trim();
    const pw = (passwordRef.current?.value ?? "").trim();

    if (!userName) {
      toast.error("변경하실 닉네임을 입력해주세요.");
      return;
    }

    if (userName === data?.userName) {
      toast.error("현재와 동일한 닉네임입니다.");
      return;
    }

    if (!pw) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    let dataRes: ApiOk<AvailabilityResponse> | undefined;
    try {
      dataRes = await checkUserName.mutateAsync({ userName });
    } catch {
      toast.error("중복 확인 중 오류가 발생했습니다.");
      return;
    }

    if (!dataRes?.body) {
      toast.error("중복 확인 중 오류가 발생했습니다.");
      return;
    }

    if (!dataRes.body.available) {
      toast.error("이미 사용 중인 닉네임입니다.");
      return;
    }

    rename.mutate(
      { body: { userName, password: pw } },
      {
        onSuccess: () => {
          toast.success("닉네임이 성공적으로 변경되었습니다.");
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-3 items-center">
          <Body variant="body1" className="font-semibold">
            닉네임 변경
          </Body>
          <Body variant="body2" className="text-gray-600">
            닉네임 변경을 위해 비밀번호 확인이 필요합니다.
          </Body>
          <Input
            key={nicknameKey}
            ref={nicknameRef}
            autoFocus
            defaultValue={data?.userName ?? ""}
            placeholder="새 닉네임"
            className="h-10 pl-4 pr-12 bg-gray-50 text-sm shadow-none transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#9ECD87]"
          />
          <Input
            key={passwordKey}
            ref={passwordRef}
            type="password"
            defaultValue=""
            placeholder="현재 비밀번호"
            className="h-10 pl-4 pr-12 bg-gray-50 text-sm shadow-none transition-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#9ECD87]"
          />
        </Column>
      }
      cancelText="취소"
      onCancelClick={onClose}
      ctaText={isLoading ? "처리 중..." : "변경하기"}
      isLoading={isLoading}
      onCtaClick={handleSaveName}
    />
  );
};

export const LogoutModal = ({ open, onClose }: ProfileModalProps) => {
  const signout = useSignout();

  const handleLogout = () => {
    signout.mutate();
    toast.success("로그아웃 되었습니다.");
    onClose();
  };

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      description={
        <Column className="gap-3 items-center">
          <Body variant="body1" className="font-semibold">
            로그아웃 하시겠어요?
          </Body>
          <Body variant="body2" className="text-gray-600">
            확인을 누르면 로그아웃됩니다.
          </Body>
        </Column>
      }
      cancelText="취소"
      onCancelClick={onClose}
      ctaText="확인"
      onCtaClick={handleLogout}
    />
  );
};

import { useEffect } from "react";
import Column from "@/components/common/container/column";
import Heading from "@/components/text/heading";
import Body from "@/components/text/body";
import { Button } from "@/components/common/button/button";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import { tsr } from "@/apis/client/ts-rest/client";
import { AuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import BrandLogo from "@/assets/logos/brand.svg?react";

const OauthCallbackPage = () => {
  const navigate = useNavigate();

  const goMyPage = () => {
    navigate({ to: ROUTES.My, replace: true });
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await tsr.auth.reissue.mutation({ body: {} });

      if (cancelled) return;

      if (res.status !== 200) {
        toast.error("로그인 처리 중 문제가 발생했어요. 다시 시도해주세요.");
        return;
      }

      const token = res.body?.accessToken;
      if (!token) {
        toast.error("로그인 처리 중 문제가 발생했어요. 다시 시도해주세요.");
        return;
      }

      AuthStore.actions.setAccessToken(token);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Column className="min-h-[85vh] items-center justify-center gap-0 px-6">
      <BrandLogo className="h-12 w-auto mb-5" />

      <Heading
        variant="heading2"
        className="font-extrabold! tracking-tight fc-gray-900 text-[28px]!"
      >
        어슬렁에 오신 걸 환영합니다
      </Heading>

      <Body
        variant="body2"
        className="text-center fc-gray-600 leading-[1.7] mt-4 text-[16.5px]!"
      >
        네이버 로그인이 완료되었습니다.
        <br />
        취향 태그를 설정하면 어슬렁이 더 잘 맞는 여행지를 추천해드려요.
      </Body>

      <Button
        className="bg-emphasis text-white! mt-12 h-13 px-10 text-[16px]!"
        onClick={goMyPage}
      >
        마이페이지로 이동
      </Button>
    </Column>
  );
};

export default OauthCallbackPage;

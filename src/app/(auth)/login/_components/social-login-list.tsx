import GoogleIcon from "@/assets/logos/google.svg?react";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Border } from "@/components/ui/border";
import NaverIconPng from "@/assets/logos/naver.png";
import { toast } from "sonner";

const SocialLoginList = () => {
  return (
    <Column className="mt-15">
      <Row className="gap-2 items-center">
        <Border direction="horizontal" />
        <Body variant="body2" className="fc-gray-500">
          SNS 간편 로그인
        </Body>
        <Border direction="horizontal" />
      </Row>
      <Row className="gap-4 mt-7.5 justify-center">
        <GoogleIcon
          onClick={() => toast.error("준비중입니다.")}
          className="text-gray-300 cursor-pointer size-10"
        />
        <a href="http://34.64.78.140:8000/core/oauth2/authorization/naver">
          <img
            src={NaverIconPng}
            alt="naver login"
            className="size-10 cursor-pointer"
          />
        </a>
      </Row>
    </Column>
  );
};

export default SocialLoginList;

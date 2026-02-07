import Row from "@/components/common/container/row";
import { Border } from "@/components/ui/border";
import { ROUTES } from "@/constants/routes";
import { handleNotReady } from "@/libs/utils";
import { Link } from "@tanstack/react-router";

const LoginList = () => {
  return (
    <Row className="h-4.5 w-fit mt-10">
      <button
        type="button"
        onClick={handleNotReady}
        className="fc-gray-700 hover:underline"
      >
        이메일 찾기
      </button>

      <Border direction="vertical" className="mx-4" />

      <button
        type="button"
        onClick={handleNotReady}
        className="fc-gray-700 hover:underline"
      >
        비밀번호 찾기
      </button>
      <Border direction="vertical" className="mx-4" />
      <Link
        to={ROUTES.Register}
        replace={true}
        className="fc-emphasis font-bold"
      >
        회원가입
      </Link>
    </Row>
  );
};

export default LoginList;

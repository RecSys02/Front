import Row from "@/components/common/container/row";
import { Border } from "@/components/ui/border";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

const LoginList = () => {
  return (
    <Row className="h-4.5 w-fit mt-10">
      <Link to={ROUTES.Register} className="fc-gray-700">
        이메일 찾기
      </Link>
      <Border direction="vertical" className="mx-4" />
      <Link to={ROUTES.Register} className="fc-gray-700">
        비밀번호 찾기
      </Link>
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

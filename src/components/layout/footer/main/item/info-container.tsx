import Row from "@/components/common/container/row";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

const InfoContainer = () => {
  return (
    <Row className="flex justify-end gap-16 h-6 items-center">
      <Link to={ROUTES.Home} className="text-body2">
        팀 소개
      </Link>
      <Link to={ROUTES.Home} className="text-body2">
        고객센터
      </Link>
      <Link to={ROUTES.Home} className="text-body2 fc-emphasis font-bold">
        개인정보처리방침
      </Link>
      <Link to={ROUTES.Home} className="text-body2">
        이용약관
      </Link>
    </Row>
  );
};

export default InfoContainer;

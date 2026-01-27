import Body from "@/components/text/body";
import { ROUTES } from "@/constants/routes";
import { Link } from "@tanstack/react-router";

type Props = {
  userName: string | null;
  isLoggedIn: boolean;
  isUserLoading?: boolean;
};

const LoginContainer = ({ userName, isLoggedIn, isUserLoading }: Props) => {
  const safeName = (userName ?? "").trim();

  if (!isLoggedIn) {
    return (
      <Link
        to={ROUTES.Login}
        className="text-body2 md:text-body2 fc-gray-600 hover:fc-gray-900"
      >
        로그인
      </Link>
    );
  }

  if (isUserLoading || !safeName) {
    return (
      <Body variant="body2" className="fc-gray-500">
        불러오는 중…
      </Body>
    );
  }

  return (
    <>
      <Body variant="body2">{safeName}</Body>
      <Body variant="body2" className="fc-gray-500">
        님, 새로운 여정이 기다리고 있습니다
      </Body>
    </>
  );
};

export default LoginContainer;

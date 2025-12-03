import Body from "@/components/text/body";
import { Link } from "@tanstack/react-router";

type Props = {
  userName: string | null;
  isLoggedIn: boolean;
};

const LoginContainer = ({ userName, isLoggedIn }: Props) => {
  if (!isLoggedIn) {
    return (
      <Link
        to="/login"
        className="text-body2 md:text-body2 fc-gray-600 hover:fc-gray-900"
      >
        로그인
      </Link>
    );
  }
  if (isLoggedIn) {
    return (
      <>
        <Body variant="body2">{userName}</Body>
        <Body variant="body2" className="fc-gray-500">
          님, 새로운 여정이 기다리고 있습니다
        </Body>
      </>
    );
  }
  return <Body>···</Body>;
};

export default LoginContainer;

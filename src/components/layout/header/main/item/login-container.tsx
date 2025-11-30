import Body from "@/components/text/body";
import { Link } from "@tanstack/react-router";

type Props = {
  userName: string | null;
  status: number;
};

const LoginContainer = ({ userName, status }: Props) => {
  if (status == 401) {
    return (
      <Link
        to="/login"
        className="text-body2 md:text-body2 text-gray-600 hover:text-gray-900"
      >
        로그인
      </Link>
    );
  }
  if (status == 200) {
    return (
      <>
        <Body variant="body2">{userName}</Body>
        <Body variant="body2" className="text-gray-500">
          님, 새로운 여정이 기다리고 있습니다
        </Body>
      </>
    );
  }
  return <Body>···</Body>;
};

export default LoginContainer;

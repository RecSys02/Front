import Row from "@/components/common/container/row";
import { Locale } from "@/constants/types";
import LocaleMenu from "./locale-menu";
import { useUser } from "@/hooks/user.hook";
import LoginContainer from "./login-container";
import UserMenu from "./user-menu";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const ETCContainer = ({ locale, onChange }: Props) => {
  const { data, isSuccess } = useUser();
  const userName = data?.userName;

  return (
    <Row className="w-fit items-center h-9 justify-end">
      <LoginContainer userName={userName} isLoggedIn={isSuccess} />
      <Row className="gap-2 pl-4 items-center">
        <UserMenu isLoggedIn={isSuccess} />
        <LocaleMenu locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default ETCContainer;

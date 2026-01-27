import Row from "@/components/common/container/row";
import { Locale } from "@/constants/types";
import LocaleMenu from "./locale-menu";
import { useUserMe } from "@/hooks/user.hook";
import LoginContainer from "./login-container";
import UserMenu from "./user-menu";
import { AuthStore } from "@/stores/auth.store";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const ETCContainer = ({ locale, onChange }: Props) => {
  const isLoggedIn = !!AuthStore.actions.getAccessToken(); 

  const { data, isFetching } = useUserMe();
  const userName = data?.userName ?? null;

  return (
    <Row className="w-fit items-center h-9 justify-end">
      <LoginContainer
        userName={userName}
        isLoggedIn={isLoggedIn}
        isUserLoading={isLoggedIn && isFetching} 
      />
      <Row className="gap-2 pl-4 items-center">
        <UserMenu isLoggedIn={isLoggedIn} />
        <LocaleMenu locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default ETCContainer;

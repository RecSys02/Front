import Row from "@/components/common/container/row";
import { Locale } from "@/constants/types";
import { CircleUserRoundIcon } from "lucide-react";
import LocaleChanger from "./locale-changer";
import { useUser } from "@/hooks/user.hook";
import LoginContainer from "./login-container";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const ETCContainer = ({ locale, onChange }: Props) => {
  const { data } = useUser();
  const userName = data?.body.username;

  return (
    <Row className="w-113 items-center gap-5">
      <Row className="w-full flex justify-end">
        <LoginContainer userName={userName} status={data?.status} />
      </Row>
      <Row className="flex items-center gap-2 h-9 w-40">
        <CircleUserRoundIcon
          className="h-12 w-auto"
          color="gray"
          strokeWidth={1.0}
        />
        <LocaleChanger locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default ETCContainer;

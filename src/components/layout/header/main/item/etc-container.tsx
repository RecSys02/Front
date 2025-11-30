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
    <Row className="w-[452px] items-center gap-[20px]">
      <Row className="w-full flex justify-end">
        <LoginContainer userName={userName} status={data?.status} />
      </Row>
      <Row className="flex items-center gap-[8px] h-[36px] w-[160px]">
        <CircleUserRoundIcon
          className="h-[37px] w-auto"
          color="gray"
          strokeWidth={1.0}
        />
        <LocaleChanger locale={locale} onChange={onChange} />
      </Row>
    </Row>
  );
};

export default ETCContainer;

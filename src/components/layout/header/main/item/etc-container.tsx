import Row from "@/components/common/container/row";
import Body from "@/components/text/body";
import { Locale } from "@/constants/types";
import { CircleUserRoundIcon } from "lucide-react";
import LocaleChanger from "./locale-changer";

type Props = {
  userName: string;
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const ETCContainer = ({ userName, locale, onChange }: Props) => {
  return (
    <Row className="w-[452px] items-center">
      <Row className="w-[292px]">
        <Body variant="body2">{userName}</Body>
        <Body variant="body2" className="text-gray-500">
          님, 새로운 여정이 기다리고 있습니다
        </Body>
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

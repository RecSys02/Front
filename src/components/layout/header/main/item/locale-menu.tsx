import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Locale, LOCALES } from "@/constants/types";
import { GlobeIcon } from "lucide-react";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const LocaleMenu = ({ locale, onChange }: Props) => {
  return (
    <HoverCard openDelay={0} closeDelay={120}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center">
          <GlobeIcon className="w-auto h-7" color="gray" strokeWidth={1.0} />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="center"
        className="w-32 p-0 bg-white/90 backdrop-blur-sm border rounded shadow-md"
      >
        <Column className="flex flex-col">
          {LOCALES.map((loc) => (
            <Button
              key={loc}
              onClick={() => onChange(loc)}
              className={`px-4 py-2 text-sm text-center hover:bg-gray-100 cursor-pointer
                ${locale === loc ? "font-bold" : "font-normal"}`}
            >
              {loc === "KR" ? "한국어" : "ENG"}
            </Button>
          ))}
        </Column>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LocaleMenu;

import Row from "@/components/common/container/row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, LOCALES } from "@/constants/types";

import { GlobeIcon } from "lucide-react";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};
const LocaleChanger = ({ locale, onChange }: Props) => {
  return (
    <Row className="flex gap-3">
      <GlobeIcon className="w-auto h-7" color="gray" strokeWidth={1.0} />
      <Select
        disabled={true}
        value={locale}
        onValueChange={(val) => onChange(val as Locale)}
      >
        <SelectTrigger
          className="border-transparent bg-transparent px-0 py-0 h-auto text-body1 font-medium 
                   shadow-none focus-visible:ring-0 focus-visible:border-transparent 
                   hover:bg-transparent data-[state=open]:bg-transparent"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="bg-white/90 border border-gray-200 backdrop-blur-sm"
          align="center"
        >
          {LOCALES.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale === "KR" ? "한국어" : "ENG"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Row>
  );
};

export default LocaleChanger;

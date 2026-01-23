import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KOREA_REGIONS } from "@/constants/region.type";

export type Region = {
  province: string;
  district: string;
  neighborhoods?: string[];
};

type Props = {
  value: Region;
  onChange: (next: Region) => void;
};

const ONLY_PROVINCE = "서울특별시";

const RegionSelectField = ({ value, onChange }: Props) => {
  const provinces = [ONLY_PROVINCE];
  const districts =
    value.province === ONLY_PROVINCE
      ? (KOREA_REGIONS[ONLY_PROVINCE] ?? [])
      : [];

  return (
    <Column className="gap-2">
      <Row className="gap-2">
        <Column className="flex-1">
          <Select
            value={value.province || undefined}
            onValueChange={(province) => {
              onChange({
                province,
                district: "",
                neighborhoods: value.neighborhoods,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="시/도 선택" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Column>

        <Column className="flex-1">
          <Select
            value={value.district || undefined}
            onValueChange={(district) => onChange({ ...value, district })}
            disabled={value.province !== ONLY_PROVINCE}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="시/군/구 선택" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Column>
      </Row>
    </Column>
  );
};

export default RegionSelectField;

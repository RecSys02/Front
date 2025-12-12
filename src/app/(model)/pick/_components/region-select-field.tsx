import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KOREA_REGIONS } from "@/constants/types";

export type Region = {
  province: string;
  district: string;
  neighborhoods?: string[];
};

type Props = {
  value: Region;
  onChange: (next: Region) => void;
};

const RegionSelectField = ({ value, onChange }: Props) => {
  const provinces = Object.keys(KOREA_REGIONS);
  const districts = value.province ? KOREA_REGIONS[value.province] ?? [] : [];

  return (
    <Column className="gap-2">
      <Row className="gap-2">
        <div className="flex-1">
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
        </div>

        <div className="flex-1">
          <Select
            value={value.district || undefined}
            onValueChange={(district) => onChange({ ...value, district })}
            disabled={!value.province}
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
        </div>
      </Row>

      {!value.province && (
        <div className="text-xs text-gray-500">먼저 시/도를 선택해 주세요</div>
      )}
    </Column>
  );
};

export default RegionSelectField;

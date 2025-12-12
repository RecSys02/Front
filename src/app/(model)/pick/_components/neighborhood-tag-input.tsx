import { useMemo, useState } from "react";
import { X } from "lucide-react";
import Row from "@/components/common/container/row";
import Column from "@/components/common/container/column";
import { Input } from "@/components/ui/input";
import Body from "@/components/text/body";
import { Badge } from "@/components/ui/badge/badge";

type Props = {
  value?: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  max?: number;
};

const normalize = (s: string) => s.trim().replace(/\s+/g, " ");

const NeighborhoodTagInput = ({
  value = [],
  onChange,
  placeholder = "예) 성수, 강남, 홍대",
  max = 3,
}: Props) => {
  const [text, setText] = useState("");

  const set = useMemo(() => new Set(value), [value]);

  const add = (raw: string) => {
    const v = normalize(raw);
    if (!v) return;
    if (set.has(v)) return;
    if (value.length >= max) return;
    onChange([...value, v]);
    setText("");
  };

  const remove = (target: string) => {
    onChange(value.filter((v) => v !== target));
  };

  return (
    <Column className="gap-2 relative">
      <Input
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(text);
          }
          if (e.key === ",") {
            e.preventDefault();
            add(text.replace(",", ""));
          }
        }}
      />
      <Body className="text-[12px]! fc-gray-500">
        Enter 또는 , 로 추가 · 최대 {max}개
      </Body>
      {value.length > 0 && (
        <Row className="flex-wrap gap-2 absolute top-full">
          {value.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="flex items-center gap-1 px-3 py-1 text-xs bg-lime-100 text-lime-700 border-lime-200"
            >
              #{t}
              <button
                type="button"
                className="ml-1 inline-flex items-center text-muted-foreground hover:text-foreground"
                onClick={() => remove(t)}
                aria-label={`${t} 삭제`}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </Row>
      )}
    </Column>
  );
};

export default NeighborhoodTagInput;

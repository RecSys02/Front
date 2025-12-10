import Row from "@/components/common/container/row";
import { cn } from "@/libs/utils";
import { Badge } from "./badge/badge";

type TagSelectorProps = {
  tags: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  className?: string;
  selectedColors?: readonly string[];
};

export const TagSelector = ({
  tags,
  value,
  onChange,
  className,
  selectedColors,
}: TagSelectorProps) => {
  const toggleTag = (tag: string) => {
    const selected = value.includes(tag);
    if (selected) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...value, tag]);
    }
  };

  return (
    <Row className={cn("flex-wrap gap-2", className)}>
      {tags.map((tag, index) => {
        const isSelected = value.includes(tag);

        const selectedClass =
          selectedColors && selectedColors.length > 0
            ? selectedColors[index % selectedColors.length]
            : "bg-emphasis text-white border-transparent";

        return (
          <Badge
            key={tag}
            onClick={() => toggleTag(tag)}
            className={cn(
              "cursor-pointer select-none text-[14px] px-4 py-2 rounded-full border transition-colors",
              isSelected
                ? selectedClass
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
            )}
          >
            {tag}
          </Badge>
        );
      })}
    </Row>
  );
};

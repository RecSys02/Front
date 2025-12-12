import Row from "@/components/common/container/row";
import { cn } from "@/libs/utils";
import { Badge } from "./badge/badge";

type BaseProps = {
  tags: readonly string[];
  className?: string;
  selectedColors?: readonly string[];
};

type MultipleProps = BaseProps & {
  mode?: "multiple";
  value: string[];
  onChange: (next: string[]) => void;
};

type SingleProps = BaseProps & {
  mode: "single";
  value: string | null;
  onChange: (next: string | null) => void;
};

type TagSelectorProps = MultipleProps | SingleProps;

export const TagSelector = (props: TagSelectorProps) => {
  const { tags, className, selectedColors } = props;
  const isMultiple = props.mode !== "single";

  const toggleTag = (tag: string) => {
    if (isMultiple) {
      const selected = props.value.includes(tag);
      if (selected) {
        props.onChange(props.value.filter((t) => t !== tag));
      } else {
        props.onChange([...props.value, tag]);
      }
    } else {
      const selected = props.value === tag;
      props.onChange(selected ? null : tag);
    }
  };

  const getSelectedClass = (index: number) => {
    if (!selectedColors || selectedColors.length === 0) {
      return "bg-emphasis text-white border-transparent";
    }

    if (!isMultiple) {
      return selectedColors[0];
    }

    return selectedColors[index % selectedColors.length];
  };

  return (
    <Row className={cn("flex-wrap gap-2", className)}>
      {tags.map((tag, index) => {
        const isSelected = isMultiple
          ? props.value.includes(tag)
          : props.value === tag;

        const selectedClass = getSelectedClass(index);

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

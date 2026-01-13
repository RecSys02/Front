import Row from "@/components/common/container/row";
import { cn } from "@/libs/utils";
import { Badge } from "./badge/badge";

export type TagOption = {
  id: number;
  label: string;
};

type CommonProps = {
  className?: string;
  selectedColors?: readonly string[];
};

type BaseStringProps = CommonProps & {
  variant?: "string";
  tags: readonly string[];
};

type MultipleStringProps = BaseStringProps & {
  mode?: "multiple";
  value: string[];
  onChange: (next: string[]) => void;
};

type SingleStringProps = BaseStringProps & {
  mode: "single";
  value: string | null;
  onChange: (next: string | null) => void;
};

type BaseOptionProps = CommonProps & {
  variant: "option";
  tags: readonly TagOption[];
};

type MultipleOptionProps = BaseOptionProps & {
  mode?: "multiple";
  value: number[];
  onChange: (next: number[]) => void;
};

type SingleOptionProps = BaseOptionProps & {
  mode: "single";
  value: number | null;
  onChange: (next: number | null) => void;
};

type TagSelectorProps =
  | MultipleStringProps
  | SingleStringProps
  | MultipleOptionProps
  | SingleOptionProps;

export const TagSelector = (props: TagSelectorProps) => {
  const { className, selectedColors } = props;

  const isOption = props.variant === "option";
  const isMultiple = props.mode !== "single";

  const getSelectedClass = (index: number) => {
    if (!selectedColors || selectedColors.length === 0) {
      return "bg-emphasis text-white border-transparent";
    }
    if (!isMultiple) return selectedColors[0];
    return selectedColors[index % selectedColors.length];
  };

  const items = isOption
    ? props.tags.map((t) => ({ key: t.id, label: t.label }))
    : props.tags.map((t) => ({ key: t, label: t }));

  const toggle = (key: number | string) => {
    if (isMultiple) {
      if (isOption) {
        const value = (props as MultipleOptionProps).value;
        const selected = value.includes(key as number);
        (props as MultipleOptionProps).onChange(
          selected
            ? value.filter((v) => v !== (key as number))
            : [...value, key as number]
        );
      } else {
        const value = (props as MultipleStringProps).value;
        const selected = value.includes(key as string);
        (props as MultipleStringProps).onChange(
          selected
            ? value.filter((v) => v !== (key as string))
            : [...value, key as string]
        );
      }
    } else {
      if (isOption) {
        const value = (props as SingleOptionProps).value;
        const selected = value === (key as number);
        (props as SingleOptionProps).onChange(
          selected ? null : (key as number)
        );
      } else {
        const value = (props as SingleStringProps).value;
        const selected = value === (key as string);
        (props as SingleStringProps).onChange(
          selected ? null : (key as string)
        );
      }
    }
  };

  return (
    <Row className={cn("flex-wrap gap-2", className)}>
      {items.map(({ key, label }, index) => {
        const selectedClass = getSelectedClass(index);

        const isSelected = isMultiple
          ? isOption
            ? (props as MultipleOptionProps).value.includes(key as number)
            : (props as MultipleStringProps).value.includes(key as string)
          : isOption
          ? (props as SingleOptionProps).value === (key as number)
          : (props as SingleStringProps).value === (key as string);

        return (
          <Badge
            key={String(key)}
            onClick={() => toggle(key)}
            className={cn(
              "cursor-pointer select-none text-[14px] px-4 py-2 rounded-full border transition-colors",
              isSelected
                ? selectedClass
                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
            )}
          >
            {label}
          </Badge>
        );
      })}
    </Row>
  );
};

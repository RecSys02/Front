"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../common/button/button";

type DateLike = Date | string | null;

type DateFieldProps = {
  value: DateLike;
  placeholder?: string;
  disabledBefore?: Date;
  onChange: (date: Date | null) => void;
  className?: string;
};

const toDate = (value: DateLike): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const DateField = ({
  value,
  placeholder = "날짜 선택",
  disabledBefore,
  onChange,
  className,
}: DateFieldProps) => {
  const [open, setOpen] = React.useState(false);

  const date = toDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`justify-between font-normal ${className}`}
        >
          <span className={!date ? "text-muted-foreground" : ""}>
            {date ? date.toLocaleDateString() : placeholder}
          </span>
          <ChevronDownIcon className="size-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          disabled={disabledBefore ? { before: disabledBefore } : undefined}
          captionLayout="dropdown"
          onSelect={(d) => {
            onChange(d ?? null);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateField;

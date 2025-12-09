import type { ReactNode, Dispatch, SetStateAction } from "react";

export type TextFieldType = "text" | "password";

export type ShowIfCondition<TValues> =
  | { condition: boolean }
  | { key: keyof TValues; value: unknown };

export type FormItemConfig<TValues> = {
  key: keyof TValues;
  type?: TextFieldType; 
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  showIf?: ShowIfCondition<TValues>[];
  children?: ReactNode;
};

export type CustomFormProps<TValues> = {
  values: TValues;
  setValues: Dispatch<SetStateAction<TValues>>;
  items: FormItemConfig<TValues>[];
  onSubmit: () => void;
  isValid: boolean;
  submitLabel: string;
};

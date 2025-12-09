import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { EyeOff, Eye, X } from "lucide-react";
import { useState } from "react";
import { Field, FieldLabel, FieldSet, FieldGroup } from "../field";
import { Input } from "../input";
import { CustomFormProps, FormItemConfig, TextFieldType } from "./form.type";
import { shouldShow } from "./form.util";

export function CustomForm<TValues>({
  values,
  setValues,
  items,
  onSubmit,
  isValid,
  submitLabel,
}: CustomFormProps<TValues>) {
  const [passwordVisible, setPasswordVisible] = useState<
    Record<string, boolean>
  >({});

  const handleChange = (field: keyof TValues, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisible = (fieldName: string) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const renderField = (item: FormItemConfig<TValues>) => {
    const name = String(item.key);
    const rawValue = values[item.key];

    if (item.children) {
      return <Field key={name}>{item.children}</Field>;
    }

    const type: TextFieldType = item.type ?? "text";
    const isPassword = type === "password";
    const visible = passwordVisible[name] ?? false;

    const inputType = isPassword && visible ? "text" : type;

    const inputValue =
      (rawValue as string | number | readonly string[] | undefined) ?? "";

    const paddingClass = isPassword
      ? "pr-24"
      : item.clearable
      ? "pr-10"
      : "pr-4";

    return (
      <Field key={name}>
        {item.label && (
          <FieldLabel htmlFor={name} className="text-body2">
            {item.label}
          </FieldLabel>
        )}

        <Row className="relative w-full">
          <Input
            id={name}
            type={inputType}
            placeholder={item.placeholder}
            disabled={item.disabled}
            className={`h-15 text-body2 w-full ${paddingClass}`}
            value={inputValue}
            onChange={(e) => handleChange(item.key, e.target.value)}
          />

          {isPassword && inputValue !== "" && (
            <>
              <button
                type="button"
                onClick={() => togglePasswordVisible(name)}
                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              <button
                type="button"
                onClick={() => handleChange(item.key, "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </>
          )}

          {!isPassword && item.clearable && inputValue !== "" && (
            <button
              type="button"
              onClick={() => handleChange(item.key, "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </Row>
      </Field>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Column className="w-120 max-w-md">
        <FieldSet>
          <FieldGroup>
            {items
              .filter((item) => shouldShow(item, values))
              .map((item) => renderField(item))}
          </FieldGroup>

          <Button
            type="submit"
            className={`mt-4 h-15 w-full text-body1 rounded-xl transition-colors duration-200 ${
              isValid
                ? "bg-emphasis fc-secondary hover:bg-emphasis"
                : "bg-gray-300 fc-gray-500 hover:bg-gray-300"
            }`}
          >
            {submitLabel}
          </Button>
        </FieldSet>
      </Column>
    </form>
  );
}

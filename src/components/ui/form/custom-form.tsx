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

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const togglePasswordVisible = (fieldName: string) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const validateField = (
    item: FormItemConfig<TValues>,
    currentValues: TValues,
    options?: { onlyLive?: boolean }
  ): string | null => {
    const rules = item.rules;
    if (!rules || rules.length === 0) return null;

    const value = currentValues[item.key];

    for (const rule of rules) {
      if (options?.onlyLive && !rule.live) {
        continue;
      }

      if (rule.required) {
        const empty =
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0);

        if (empty) {
          return rule.message;
        }
      }

      if (rule.validate && !rule.validate(currentValues, value)) {
        return rule.message;
      }
    }

    return null;
  };

  const handleChange = (item: FormItemConfig<TValues>, value: unknown) => {
    const name = String(item.key);

    setValues((prev) => {
      const next = { ...prev, [item.key]: value };

      const hasLiveRule = item.rules?.some((r) => r.live);

      if (hasLiveRule) {
        const error = validateField(item, next, { onlyLive: true });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      } else if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      return next;
    });
  };

  const renderField = (item: FormItemConfig<TValues>) => {
    const name = String(item.key);
    const rawValue = values[item.key];

    if (item.children) {
      const hasRequired = item.rules?.some((r) => r.required);

      return (
        <Field key={name}>
          {item.label && (
            <FieldLabel
              htmlFor={name}
              className="text-body2 flex items-center gap-1"
            >
              <span
                className={
                  hasRequired ? "text-red-500" : "text-red-500 opacity-0"
                }
              >
                *
              </span>
              {item.label}
            </FieldLabel>
          )}
          {item.children}
        </Field>
      );
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

    const errorMessage = errors[name];

    return (
      <Field key={name}>
        {item.label && (
          <FieldLabel
            htmlFor={name}
            className="text-body2 flex items-center gap-1"
          >
            <span
              className={
                item.rules?.some((r) => r.required)
                  ? "text-red-500"
                  : "text-red-500 opacity-0"
              }
            >
              *
            </span>
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
            onChange={(e) => handleChange(item, e.target.value)}
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
                onClick={() => handleChange(item, "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </>
          )}

          {!isPassword && item.clearable && inputValue !== "" && (
            <button
              type="button"
              onClick={() => handleChange(item, "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </Row>

        {errorMessage && (
          <span className="mt-1 text-body3 text-red-500">{errorMessage}</span>
        )}
      </Field>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, string | null> = {};

    items.forEach((item) => {
      const name = String(item.key);

      if (!shouldShow(item, values)) {
        nextErrors[name] = null;
        return;
      }

      const error = validateField(item, values);
      nextErrors[name] = error;
    });

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some((msg) => !!msg);
    if (hasError) return;

    if (!isValid) return;

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Column className="w-full">
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

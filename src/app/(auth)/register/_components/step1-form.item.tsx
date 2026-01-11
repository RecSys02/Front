import { FormItemConfig } from "@/components/ui/form/form.type";
import { RegisterFormValues } from "./register.type";
import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import Row from "@/components/common/container/row";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export type GenerateRegisterStep1ItemsProps = {
  values: RegisterFormValues;
  setValues: React.Dispatch<React.SetStateAction<RegisterFormValues>>;
  onCheckEmail: () => void;
  isCheckingEmail: boolean;
  resetEmailAvailable: () => void;
  isEmailAvailable: boolean | null;
};

export const generateRegisterStep1Items = ({
  values,
  setValues,
  onCheckEmail,
  isCheckingEmail,
  resetEmailAvailable,
  isEmailAvailable,
}: GenerateRegisterStep1ItemsProps): FormItemConfig<RegisterFormValues>[] => [
  {
    key: "email",
    label: "이메일",
    rules: [{ required: true, message: "이메일를 입력해주세요." }],
    children: (
      <Column className="w-full gap-2">
        <Row className="w-full items-center gap-2">
          <Row className="relative flex-1">
            <Input
              id="email"
              type="text"
              placeholder="이메일 입력"
              className="h-15 text-body2 w-full pr-10"
              value={values.email}
              onChange={(e) => {
                resetEmailAvailable();
                setValues((prev) => ({ ...prev, email: e.target.value }));
              }}
            />

            {isEmailAvailable === true && !isCheckingEmail && (
              <Check
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}
          </Row>
          <Button
            type="button"
            className="h-15 px-4 text-body3 w-20 text-white bg-emphasis"
            onClick={onCheckEmail}
            isLoading={isCheckingEmail}
          >
            중복 확인
          </Button>
        </Row>
      </Column>
    ),
  },
  {
    key: "password",
    type: "password",
    label: "비밀번호",
    placeholder: "8자리 이상 입력",
    rules: [
      {
        required: true,
        message: "비밀번호를 입력해주세요.",
      },
      {
        live: true,
        message: "소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
        validate: (_, value) =>
          typeof value === "string" &&
          /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(value),
      },
    ],
  },
  {
    key: "passwordConfirm",
    type: "password",
    label: "비밀번호 확인",
    placeholder: "비밀번호 재입력",
    rules: [
      {
        live: true,
        required: true,
        message: "비밀번호가 일치하지 않습니다.",
        validate: (values, value) =>
          typeof value === "string" &&
          value.trim() !== "" &&
          values.password === value,
      },
    ],
  },
  {
    key: "userName",
    type: "text",
    label: "닉네임",
    placeholder: "닉네임 입력",
    clearable: true,
    rules: [{ required: true, message: "닉네임을 입력해주세요." }],
  },
  {
    key: "email",
    type: "text",
    label: "이메일",
    placeholder: "example@email.com",
    clearable: true,
  },
];

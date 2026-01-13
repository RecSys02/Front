import { FormItemConfig } from "@/components/ui/form/form.type";
import { LoginRequestDto } from "@/types/auth/auth.type";

export type LoginFormValues = LoginRequestDto;

export const generateLoginFormItems = (): FormItemConfig<LoginFormValues>[] => [
  {
    key: "email",
    type: "text",
    label: "이메일",
    placeholder: "이메일 입력",
    clearable: true,
  },
  {
    key: "password",
    type: "password",
    label: "비밀번호",
    placeholder: "비밀번호 입력",
  },
];

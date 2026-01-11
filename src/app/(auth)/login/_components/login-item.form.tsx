import Row from "@/components/common/container/row";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItemConfig } from "@/components/ui/form/form.type";
import { LoginRequestDto } from "@/types/auth/auth.type";

export type LoginFormValues = LoginRequestDto;

export const generateLoginFormItems = (
  values: LoginFormValues,
  setValues: React.Dispatch<React.SetStateAction<LoginFormValues>>
): FormItemConfig<LoginFormValues>[] => [
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
  {
    key: "remember",
    children: (
      <Row className="items-center gap-2">
        <Checkbox
          id="login-remember"
          className="size-5"
          checked={values.remember}
          onCheckedChange={(checked) =>
            setValues((prev) => ({ ...prev, remember: !!checked }))
          }
        />
        <label
          htmlFor="login-remember"
          className="text-body3 font-normal fc-gray-700"
        >
          로그인 상태 유지
        </label>
      </Row>
    ),
  },
];

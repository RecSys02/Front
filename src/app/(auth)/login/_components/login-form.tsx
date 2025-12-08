import { useState } from "react";
import { Button } from "@/components/common/button/button";
import Column from "@/components/common/container/column";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSet, FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignin } from "@/hooks/auth.hook";
import { Eye, EyeOff, X } from "lucide-react";
import Row from "@/components/common/container/row";

const LoginForm = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValid = userId.trim() !== "" && password.trim() !== "";
  const signin = useSignin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    signin.mutate({
      username: userId,
      password,
      remember,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Column className="w-120 max-w-md">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="userId" className="text-body2">
                ID
              </FieldLabel>
              <Row className="relative">
                <Input
                  id="userId"
                  type="text"
                  placeholder="아이디 입력"
                  className="h-15 text-body2 pr-10"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />

                {userId !== "" && (
                  <button
                    type="button"
                    onClick={() => setUserId("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </Row>
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className="text-body2">
                Password
              </FieldLabel>
              <Row className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호 입력"
                  className="h-15 text-body2 pr-24"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {password !== "" && (
                  <button
                    type="button"
                    onClick={() => setPassword("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </Row>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="login-save"
                className="size-5"
                onCheckedChange={(checked) => setRemember(!!checked)}
              />
              <FieldLabel
                htmlFor="login-save"
                className="text-body3 font-normal fc-gray-700"
              >
                로그인 상태 유지
              </FieldLabel>
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className={`mt-4 h-15 w-full text-body1 rounded-xl transition-colors duration-200 ${
              isValid
                ? "bg-emphasis fc-secondary hover:bg-emphasis"
                : "bg-gray-300 fc-gray-500 hover:bg-gray-300"
            }`}
          >
            로그인
          </Button>
        </FieldSet>
      </Column>
    </form>
  );
};

export default LoginForm;

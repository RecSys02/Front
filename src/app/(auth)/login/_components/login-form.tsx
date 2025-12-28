import { useState } from "react";
import { useSignin } from "@/hooks/auth.hook";
import { CustomForm } from "@/components/ui/form/custom-form";
import { generateLoginFormItems, LoginFormValues } from "./login-item.form";
import { Surface } from "@/components/ui/surface";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    //remember: false,
  });

  const isValid = values.password.trim() !== "";
  const signin = useSignin();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      await signin.mutateAsync({
        email: values.email,
        password: values.password,
        //remember: values.remember,
      });

      //toast.success(`${res.userid}님, 환영합니다!`);
      navigate({ to: ROUTES.Home });
    } catch {
      toast.error("아이디와 비밀번호를 정확히 입력해 주세요.");
    }
  };
  const items = generateLoginFormItems();

  return (
    <Surface className="max-w-md w-full">
      <CustomForm<LoginFormValues>
        values={values}
        setValues={setValues}
        items={items}
        onSubmit={handleSubmit}
        isValid={isValid}
        submitLabel="로그인"
      />
    </Surface>
  );
};

export default LoginForm;

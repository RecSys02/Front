import { useState } from "react";
import { useSignin } from "@/hooks/auth.hook";
import { CustomForm } from "@/components/ui/form/custom-form";
import { generateLoginFormItems, LoginFormValues } from "./login-item.form";
import { Surface } from "@/components/ui/surface";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const isValid = values.password.trim() !== "";
  const signin = useSignin();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!isValid) return;
    const payload = {
      email: values.email,
      password: values.password,
    };
    signin.mutate(
      { body: payload },
      {
        onSuccess: () => {
          navigate({ to: ROUTES.Home });
        },
      }
    );
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

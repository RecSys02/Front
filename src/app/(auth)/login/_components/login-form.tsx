import { useState } from "react";
import { useSignin } from "@/hooks/auth.hook";
import { CustomForm } from "@/components/ui/form/custom-form";
import { generateLoginFormItems, LoginFormValues } from "./login-item.form";

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    userId: "",
    password: "",
    remember: false,
  });

  const isValid = values.userId.trim() !== "" && values.password.trim() !== "";
  const signin = useSignin();

  const onSubmit = async () => {
    if (!isValid) return;
    console.log("on func", values);

    signin.mutate({
      username: values.userId,
      password: values.password,
      remember: values.remember,
    });
  };
  const items = generateLoginFormItems(values, setValues);

  return (
    <CustomForm<LoginFormValues>
      values={values}
      setValues={setValues}
      items={items}
      onSubmit={onSubmit}
      isValid={isValid}
      submitLabel="로그인"
    />
  );
};

export default LoginForm;

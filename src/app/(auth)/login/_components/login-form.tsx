import { useState } from "react";
import { useSignin } from "@/hooks/auth.hook";
import { CustomForm } from "@/components/ui/form/custom-form";
import { generateLoginFormItems, LoginFormValues } from "./login-item.form";
import { Surface } from "@/components/ui/surface";

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    userId: "",
    password: "",
    remember: false,
  });

  const isValid = values.userId.trim() !== "" && values.password.trim() !== "";
  const signin = useSignin();

  const handleSubmit = async () => {
    if (!isValid) return;
    console.log("on func", values);

    signin.mutate({
      userid: values.userId,
      password: values.password,
      remember: values.remember,
    });
  };
  const items = generateLoginFormItems(values, setValues);

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

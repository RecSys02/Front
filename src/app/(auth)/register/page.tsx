import Column from "@/components/common/container/column";
import Title from "@/components/text/title";
import RegisterForm from "./_components/register-form";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import { AuthStore } from "@/stores/auth.store";

const RegisterPage = () => {
  const navigate = useNavigate();

  if (AuthStore.actions.isLoggedIn()) {
    navigate({ to: ROUTES.Home, replace: true });
    return null;
  }
  return (
    <Column className="pt-30 pb-30 px-40 items-center w-200 mx-auto">
      <Title className="mb-20 w-full text-center font-extrabold">
        회원가입
      </Title>
      <RegisterForm />
    </Column>
  );
};

export default RegisterPage;

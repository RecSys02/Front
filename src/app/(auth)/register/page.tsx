import Column from "@/components/common/container/column";
import Title from "@/components/text/title";
import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
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

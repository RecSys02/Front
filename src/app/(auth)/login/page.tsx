import Column from "@/components/common/container/column";
import LoginForm from "./_components/login-form";
import Title from "@/components/text/title";
import LoginList from "./_components/login-list";
import SocialLoginList from "./_components/social-login-list";

const LoginPage = () => {
  return (
    <Column className="pt-30 pb-40 px-40 items-center w-200 mx-auto">
      <Title variant="title2" className="mb-20 w-full text-center">
        로그인
      </Title>
      <LoginForm />
      <LoginList />
      <SocialLoginList />
    </Column>
  );
};

export default LoginPage;

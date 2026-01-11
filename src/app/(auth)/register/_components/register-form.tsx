import { CustomForm } from "@/components/ui/form/custom-form";
import { useCheckEmail, useRegister, useSignin } from "@/hooks/auth.hook";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormValues, RegisterStep } from "./register.type";
import { generateRegisterUtil } from "./register.util";
import { generateRegisterStep1Items } from "./step1-form.item";
import { generateRegisterStep2Items } from "./step2-form.item";
import Column from "@/components/common/container/column";
import RegisterStepHeader from "./register-step-header";
import { Border } from "@/components/ui/border";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import WelcomeModal from "./welcome-modal";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
  const [step, setStep] = useState<RegisterStep>(1);
  const [values, setValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    tags: {
      themes: null,
      moods: null,
      dislikes: null,
      foods: null,
      cafes: null,
      activity: null,
      activityValue: 50,
    },
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  const checkEmail = useCheckEmail();
  const registerUser = useRegister();
  const signin = useSignin();

  const { isStep1Valid, isValid } = generateRegisterUtil(
    values,
    isEmailAvailable
  );

  const handleSubmit = () => {
    if (step === 1) {
      if (!isStep1Valid) return;
      setStep(2);
      return;
    }
    registerUser.mutate(values, {
      onSuccess: () => {
        setOpenWelcomeModal(true);
        signin.mutate({
          email: values.email,
          password: values.password,
          remember: false,
        });
      },
    });
  };

  const handleCheckEmail = () => {
    const email = values.email.trim();
    if (!email) {
      toast.error("이메일를 입력해주세요.");
      return;
    }

    setIsEmailAvailable(null);

    checkEmail.mutate(email, {
      onSuccess: (res: any) => {
        if (res.available) {
          setIsEmailAvailable(true);
          toast.success("사용 가능한 이메일입니다.");
        } else {
          setIsEmailAvailable(false);
          toast.error("이미 사용 중인 이메일입니다.");
        }
      },
    });
  };

  const buildItems = () => {
    if (step === 1) {
      return generateRegisterStep1Items({
        values,
        setValues,
        onCheckEmail: handleCheckEmail,
        isCheckingEmail: checkEmail.isPending,
        resetEmailAvailable: () => setIsEmailAvailable(null),
        isEmailAvailable,
      });
    }
    return generateRegisterStep2Items(values, setValues);
  };

  const items = buildItems();

  return (
    <Column className="max-w-md">
      <RegisterStepHeader step={step} />
      <Border className="mt-4 mb-4 " />
      <CustomForm
        values={values}
        setValues={setValues}
        items={items}
        onSubmit={handleSubmit}
        isValid={isValid}
        submitLabel={step === 1 ? "다음" : "회원가입"}
        cancelLabel={step === 1 ? "취소" : "이전"}
        onCancel={() => {
          if (step === 1) {
            navigate({ to: ROUTES.Login });
          } else {
            setStep(1);
          }
        }}
      />
      <WelcomeModal
        open={openWelcomeModal}
        onOpenChange={setOpenWelcomeModal}
        onClose={() => {
          setOpenWelcomeModal(false);
          navigate({ to: ROUTES.Home });
        }}
      />
    </Column>
  );
};

export default RegisterForm;

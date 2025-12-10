import { CustomForm } from "@/components/ui/form/custom-form";
import { useCheckUserId } from "@/hooks/auth.hook";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormValues, RegisterStep } from "./register.type";
import { generateRegisterUtil } from "./register.util";
import { generateRegisterStep1Items } from "./step1-item.form";
import { generateRegisterStep2Items } from "./step2-item.form";
import Column from "@/components/common/container/column";
import RegisterStepHeader from "./register-step-header";
import { Border } from "@/components/ui/border";

const RegisterForm = () => {
  const [step, setStep] = useState<RegisterStep>(1);
  const [values, setValues] = useState<RegisterFormValues>({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    email: "",
    tags: {
      themes: [],
      moods: [],
      dislikes: [],
      foods: [],
      cafes: [],
      activity: null,
      activityValue: 50,
    },
  });

  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(
    null
  );

  const checkId = useCheckUserId();

  const { isStep1Valid, isStep2Valid, isValid } = generateRegisterUtil(
    values,
    isUserIdAvailable,
    step
  );

  const handleSubmit = () => {
    if (step === 1) {
      if (!isStep1Valid) return;
      setStep(2);
      return;
    }

    if (!isStep2Valid) return;

    // TODO: 회원가입 API 호출
  };

  const handleCheckUserId = () => {
    const userid = values.userId.trim();
    if (!userid) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    setIsUserIdAvailable(null);

    checkId.mutate(userid, {
      onSuccess: (res) => {
        if (res.available) {
          setIsUserIdAvailable(true);
          toast.success("사용 가능한 아이디입니다.");
        } else {
          setIsUserIdAvailable(false);
          toast.error("이미 사용 중인 아이디입니다.");
        }
      },
      onError: () => {
        toast.error("중복 확인 중 오류가 발생했습니다.");
      },
    });
  };

  const buildItems = () => {
    if (step === 2) {
      return generateRegisterStep1Items({
        values,
        setValues,
        onCheckUserId: handleCheckUserId,
        isCheckingUserId: checkId.isPending,
        resetUserIdAvailable: () => setIsUserIdAvailable(null),
        isUserIdAvailable,
      });
    }
    return generateRegisterStep2Items(values, setValues);
  };

  const items = buildItems();

  return (
    <Column className="max-w-md">
      <RegisterStepHeader step={2} />
      <Border className="mt-4 mb-4 " />
      <CustomForm
        values={values}
        setValues={setValues}
        items={items}
        onSubmit={handleSubmit}
        isValid={isValid}
        submitLabel={step === 1 ? "다음" : "회원가입"}
      />
    </Column>
  );
};

export default RegisterForm;

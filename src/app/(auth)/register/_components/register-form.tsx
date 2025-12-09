import { CustomForm } from "@/components/ui/form/custom-form";
import { useCheckUserId } from "@/hooks/auth.hook";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormValues } from "./register.type";
import { generateRegisterUtil } from "./register.util";
import { generateRegisterStep1Items } from "./step1-item.form";
import { generateRegisterStep2Items } from "./step2-item.form";

export type RegisterStep = 1 | 2;

const RegisterForm = () => {
  const [step, setStep] = useState<RegisterStep>(1);
  const [values, setValues] = useState<RegisterFormValues>({
    userId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    email: "",
    travelStyle: [],
    companions: [],
    budgetRange: "",
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
    if (step === 1) {
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
    <CustomForm
      values={values}
      setValues={setValues}
      items={items}
      onSubmit={handleSubmit}
      isValid={isValid}
      submitLabel={step === 1 ? "다음" : "회원가입"}
    />
  );
};

export default RegisterForm;

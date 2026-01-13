import { CustomForm } from "@/components/ui/form/custom-form";
import {
  useCheckEmail,
  useCheckName,
  useRegister,
  useSignin,
} from "@/hooks/auth.hook";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormValues, RegisterStep } from "./register.type";
import { EMAIL_REGEX, generateRegisterUtil } from "./register.util";
import { generateRegisterStep1Items } from "./step1-form.item";
import { generateRegisterStep2Items } from "./step2-form.item";
import Column from "@/components/common/container/column";
import RegisterStepHeader from "./register-step-header";
import { Border } from "@/components/ui/border";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import WelcomeModal from "./welcome-modal";
import { useTags } from "@/hooks/tag.hook";
import { AvailabilityResponse, CreateUserDto } from "@/types/auth/auth.type";
import { ApiOk } from "@/types/util.type";

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
      themeIds: null,
      moodIds: null,
      dislikeIds: null,
      foodIds: null,
      cafeIds: null,
      activityTagId: null,
      activityValue: 50,
    },
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [isUserNameAvailable, setIsUserNameAvailable] = useState<
    boolean | null
  >(null);

  const checkEmail = useCheckEmail();
  const checkUserName = useCheckName();
  const registerUser = useRegister();
  const signin = useSignin();

  const tagsQuery = useTags();
  const tagSource = tagsQuery.data;

  const { isStep1Valid, isValid } = generateRegisterUtil(
    values,
    isEmailAvailable,
    isUserNameAvailable
  );

  const handleSubmit = () => {
    if (step === 1) {
      if (!isStep1Valid) return;
      setStep(2);
      return;
    }

    const tagIds: number[] = [
      ...(values.tags.themeIds ?? []),
      ...(values.tags.moodIds ?? []),
      ...(values.tags.foodIds ?? []),
      ...(values.tags.cafeIds ?? []),
      ...(values.tags.dislikeIds ?? []),
      ...(values.tags.activityTagId ? [values.tags.activityTagId] : []),
    ];

    const payload: CreateUserDto = {
      email: values.email.trim(),
      password: values.password,
      userName: values.userName.trim(),
      tagIds,
    };
    registerUser.mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenWelcomeModal(true);
          signin.mutate({
            email: values.email,
            password: values.password,
          });
        },
      }
    );
  };

  const handleCheckEmail = () => {
    const email = values.email.trim();
    if (!email) return toast.error("이메일를 입력해주세요.");
    if (!EMAIL_REGEX.test(email))
      return toast.error("이메일 형식이 올바르지 않습니다.");

    setIsEmailAvailable(null);

    checkEmail.mutate(
      { body: { email } },
      {
        onSuccess: (res: ApiOk<AvailabilityResponse>) => {
          if (res.body.available) {
            setIsEmailAvailable(true);
            toast.success("사용 가능한 이메일입니다.");
          } else {
            setIsEmailAvailable(false);
            toast.error("이미 사용 중인 이메일입니다.");
          }
        },
      }
    );
  };

  const handleCheckUserName = () => {
    const userName = values.userName.trim();
    if (!userName) return toast.error("닉네임을 입력해주세요.");

    setIsUserNameAvailable(null);

    checkUserName.mutate(
      { body: { userName } },
      {
        onSuccess: (res: ApiOk<AvailabilityResponse>) => {
          if (res.body.available) {
            setIsUserNameAvailable(true);
            toast.success("사용 가능한 닉네임입니다.");
          } else {
            setIsUserNameAvailable(false);
            toast.error("이미 사용 중인 닉네임입니다.");
          }
        },
      }
    );
  };

  const items =
    step === 1
      ? generateRegisterStep1Items({
          values,
          setValues,
          onCheckEmail: handleCheckEmail,
          isCheckingEmail: checkEmail.isPending,
          resetEmailAvailable: () => setIsEmailAvailable(null),
          isEmailAvailable,
          onCheckUserName: handleCheckUserName,
          isCheckingUserName: checkUserName.isPending,
          resetUserNameAvailable: () => setIsUserNameAvailable(null),
          isUserNameAvailable,
        })
      : tagSource
      ? generateRegisterStep2Items(values, setValues, tagSource)
      : [];

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

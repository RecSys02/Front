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
import {
  buildTagIds,
  EMAIL_REGEX,
  generateRegisterUtil,
} from "./register.util";
import { generateRegisterStep1Items } from "./step1-form.item";
import { generateRegisterStep2Items } from "./step2-form.item";
import Column from "@/components/common/container/column";
import RegisterStepHeader from "./register-step-header";
import { Border } from "@/components/ui/border";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/constants/routes";
import WelcomeModal from "./welcome-modal";
import { useTags } from "@/hooks/tag.hook";
import { CreateUserDto } from "@/types/auth/auth.type";
import PolicyModal from "./policy-modal";
import { flushSync } from "react-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
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
      avoidIds: null,
      restaurantIds: null,
      cafeIds: null,
      activityTagId: null,
      activityValue: 50,
    },
    policy: false,
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const [isUserNameAvailable, setIsUserNameAvailable] = useState<
    boolean | null
  >(null);

  const [emailToCheck, setEmailToCheck] = useState("");
  const [nameToCheck, setNameToCheck] = useState("");

  const email = values.email.trim();
  const userName = values.userName.trim();

  const checkEmail = useCheckEmail(emailToCheck);
  const checkName = useCheckName(nameToCheck);
  const registerUser = useRegister();
  const signin = useSignin();

  const tagsQuery = useTags();
  const tagSource = tagsQuery.data;

  const { isStep1Valid, isValid } = generateRegisterUtil(
    values,
    isEmailAvailable,
    isUserNameAvailable,
  );

  const handleSubmit = () => {
    if (step === 1) {
      if (!isStep1Valid) return;
      setStep(2);
      return;
    }

    const payload: CreateUserDto = {
      email,
      password: values.password,
      userName,
      tagIds: buildTagIds(values.tags),
    };
    registerUser.mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenWelcomeModal(true);
          signin.mutate({
            body: { email: values.email, password: values.password },
          });
        },
      },
    );
  };

  const handleCheckEmail = async () => {
    if (!email) return toast.error("이메일를 입력해주세요.");
    if (!EMAIL_REGEX.test(email))
      return toast.error("이메일 형식이 올바르지 않습니다.");

    setIsEmailAvailable(null);

    flushSync(() => {
      setEmailToCheck(email);
    });

    const res = await checkEmail.refetch();
    const data = res.data;

    if (!data) return toast.error("이메일 중복 확인 중 오류가 발생했습니다.");

    if (data.available) {
      setIsEmailAvailable(true);
      toast.success("사용 가능한 이메일입니다.");
    } else {
      setIsEmailAvailable(false);
      toast.error("이미 사용 중인 이메일입니다.");
    }
  };

  const handleCheckUserName = async () => {
    if (!userName) return toast.error("닉네임을 입력해주세요.");

    setIsUserNameAvailable(null);

    flushSync(() => {
      setNameToCheck(userName);
    });

    const res = await checkName.refetch();
    const data = res.data;

    if (!data) return toast.error("닉네임 중복 확인 중 오류가 발생했습니다.");

    if (data.available) {
      setIsUserNameAvailable(true);
      toast.success("사용 가능한 닉네임입니다.");
    } else {
      setIsUserNameAvailable(false);
      toast.error("이미 사용 중인 닉네임입니다.");
    }
  };

  const items =
    step === 1
      ? generateRegisterStep1Items({
          values,
          setValues,
          onCheckEmail: handleCheckEmail,
          isCheckingEmail: checkEmail.isFetching,
          resetEmailAvailable: () => setIsEmailAvailable(null),
          isEmailAvailable,
          onCheckUserName: handleCheckUserName,
          isCheckingUserName: checkName.isFetching,
          resetUserNameAvailable: () => setIsUserNameAvailable(null),
          isUserNameAvailable,
          onOpenPolicyModal: () => setOpenPolicyModal(true),
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
          navigate({ to: ROUTES.Home, replace: true });
        }}
      />

      <PolicyModal
        open={openPolicyModal}
        onOpenChange={setOpenPolicyModal}
        onConfirm={() => {
          setValues((prev) => ({ ...prev, policy: true }));
        }}
      />
    </Column>
  );
};

export default RegisterForm;

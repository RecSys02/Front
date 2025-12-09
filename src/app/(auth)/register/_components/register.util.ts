import { RegisterStep } from "./register-form";
import { RegisterFormValues } from "./register.type";

export const validateStep1 = (
  values: RegisterFormValues,
  isUserIdAvailable: boolean | null
) => {
  const password = values.password.trim();
  const passwordConfirm = values.passwordConfirm.trim();

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  const isPasswordValid = passwordRegex.test(password);

  return (
    isUserIdAvailable === true &&
    values.userId.trim() !== "" &&
    isPasswordValid &&
    passwordConfirm !== "" &&
    password === passwordConfirm &&
    values.nickname.trim() !== "" &&
    values.email.trim() !== ""
  );
};

export const validateStep2 = (values: RegisterFormValues) => {
  return (
    values.travelStyle.length > 0 &&
    values.companions.length > 0 &&
    values.budgetRange !== ""
  );
};

export const generateRegisterUtil = (
  values: RegisterFormValues,
  isUserIdAvailable: boolean | null,
  step: RegisterStep
) => {
  const isStep1Valid = validateStep1(values, isUserIdAvailable);
  const isStep2Valid = validateStep2(values);
  const isValid = step === 1 ? isStep1Valid : isStep2Valid;

  return { isStep1Valid, isStep2Valid, isValid };
};

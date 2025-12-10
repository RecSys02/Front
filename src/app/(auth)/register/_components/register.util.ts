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
    values.nickname.trim() !== ""
  );
};

export const generateRegisterUtil = (
  values: RegisterFormValues,
  isUserIdAvailable: boolean | null
) => {
  const isStep1Valid = validateStep1(values, isUserIdAvailable);
  const isValid = isStep1Valid;
  return { isStep1Valid, isValid };
};

export const mapSliderToActivityIndex = (value: number) => {
  if (value < 25) return 0;
  if (value < 50) return 1;
  if (value < 75) return 2;
  return 3;
};

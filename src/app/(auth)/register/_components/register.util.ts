import { RegisterFormValues } from "./register.type";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateStep1 = (
  values: RegisterFormValues,
  isEmailAvailable: boolean | null,
  isUserNameAvailable: boolean | null
) => {
  const password = values.password.trim();
  const passwordConfirm = values.passwordConfirm.trim();

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  const isPasswordValid = passwordRegex.test(password);

  return (
    isEmailAvailable === true &&
    isUserNameAvailable === true &&
    values.email.trim() !== "" &&
    isPasswordValid &&
    passwordConfirm !== "" &&
    password === passwordConfirm &&
    values.userName.trim() !== ""
  );
};

export const generateRegisterUtil = (
  values: RegisterFormValues,
  isEmailAvailable: boolean | null,
  isUserNameAvailable: boolean | null
) => {
  const isStep1Valid = validateStep1(
    values,
    isEmailAvailable,
    isUserNameAvailable
  );
  const isValid = isStep1Valid;
  return { isStep1Valid, isValid };
};

export const mapSliderToActivityIndex = (value: number) => {
  if (value < 25) return 0;
  if (value < 50) return 1;
  if (value < 75) return 2;
  return 3;
};

import { RegisterFormValues } from "./register.type";
import type { Tag } from "@/types/tag/tag.type";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type TagOption = { id: number; label: string };

export type TagSource = {
  THEME: readonly TagOption[];
  MOOD: readonly TagOption[];
  FOOD: readonly TagOption[];
  CAFE: readonly TagOption[];
  DISLIKE: readonly TagOption[];
  ACTIVITY: readonly TagOption[];
};

type TagSourceMutable = {
  [K in keyof TagSource]: TagOption[];
};

export const mapTagsToSource = (tags: Tag[]): TagSource => {
  const source: TagSourceMutable = {
    THEME: [],
    MOOD: [],
    FOOD: [],
    CAFE: [],
    DISLIKE: [],
    ACTIVITY: [],
  };

  for (const t of tags) {
    if (t.category in source) {
      source[t.category as keyof TagSourceMutable].push({
        id: t.id,
        label: t.name,
      });
    }
  }

  return source;
};

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

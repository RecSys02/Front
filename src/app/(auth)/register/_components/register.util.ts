import { RegisterFormValues, Tags } from "./register.type";
import type { Tag } from "@/types/tag/tag.type";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type TagOption = { id: number; label: string };

export type TagSource = {
  THEME: readonly TagOption[];
  MOOD: readonly TagOption[];
  FOOD: readonly TagOption[];
  CAFE: readonly TagOption[];
  DISLIKE: readonly TagOption[];
  ACTIVITY_LEVEL: readonly TagOption[];
};

type TagSourceMutable = {
  [K in keyof TagSource]: TagOption[];
};

export const pickLabels = (
  selectedIds: number[] | null,
  options: readonly { id: number; label: string }[],
) => {
  if (!selectedIds?.length) return undefined;

  const map = new Map(options.map((o) => [o.id, o.label] as const));
  const labels = selectedIds
    .map((id) => map.get(id))
    .filter(Boolean) as string[];
  return labels.length ? labels : undefined;
};

export const mapTagsToSource = (tags: Tag[]): TagSource => {
  const source: TagSourceMutable = {
    THEME: [],
    MOOD: [],
    FOOD: [],
    CAFE: [],
    DISLIKE: [],
    ACTIVITY_LEVEL: [],
  };

  for (const t of tags) {
    if (t.tagType in source) {
      source[t.tagType as keyof TagSourceMutable].push({
        id: t.id,
        label: t.name,
      });
    }
  }

  return source;
};

export const buildTagIds = (
  tags: RegisterFormValues["tags"],
): number[] | null => {
  const ids: number[] = [
    ...(tags.themeIds ?? []),
    ...(tags.moodIds ?? []),
    ...(tags.dislikeIds ?? []),
    ...(tags.foodIds ?? []),
    ...(tags.cafeIds ?? []),
    ...(tags.activityTagId != null ? [tags.activityTagId] : []),
  ];

  const unique = Array.from(new Set(ids));
  return unique.length ? unique : null;
};

export const validateStep1 = (
  values: RegisterFormValues,
  isEmailAvailable: boolean | null,
  isUserNameAvailable: boolean | null,
) => {
  const password = values.password.trim();
  const passwordConfirm = values.passwordConfirm.trim();

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  const isPasswordValid = passwordRegex.test(password);

  return (
    values.policy === true &&
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
  isUserNameAvailable: boolean | null,
) => {
  const isStep1Valid = validateStep1(
    values,
    isEmailAvailable,
    isUserNameAvailable,
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

const ACTIVITY_VALUE_BY_IDX = [0, 25, 50, 75] as const;

const DEFAULT_TAGS: Tags = {
  themeIds: null,
  moodIds: null,
  dislikeIds: null,
  foodIds: null,
  cafeIds: null,
  activityTagId: null,
  activityValue: 50,
};

export const mapTagIdsToTagsBySource = (
  tagIds: number[] | null | undefined,
  source: TagSource | null | undefined,
): Tags => {
  if (!tagIds?.length || !source) return DEFAULT_TAGS;

  const themeSet = new Set(source.THEME.map((o) => o.id));
  const moodSet = new Set(source.MOOD.map((o) => o.id));
  const foodSet = new Set(source.FOOD.map((o) => o.id));
  const cafeSet = new Set(source.CAFE.map((o) => o.id));
  const dislikeSet = new Set(source.DISLIKE.map((o) => o.id));
  const activityIds = source.ACTIVITY_LEVEL.map((o) => o.id);

  const themeIds: number[] = [];
  const moodIds: number[] = [];
  const foodIds: number[] = [];
  const cafeIds: number[] = [];
  const dislikeIds: number[] = [];
  let activityTagId: number | null = null;

  for (const id of tagIds) {
    if (themeSet.has(id)) themeIds.push(id);
    else if (moodSet.has(id)) moodIds.push(id);
    else if (foodSet.has(id)) foodIds.push(id);
    else if (cafeSet.has(id)) cafeIds.push(id);
    else if (dislikeSet.has(id)) dislikeIds.push(id);
    else if (activityIds.includes(id)) activityTagId = id;
  }

  const activityIdx =
    activityTagId != null
      ? activityIds.findIndex((x) => x === activityTagId)
      : -1;

  return {
    themeIds: themeIds.length ? themeIds : null,
    moodIds: moodIds.length ? moodIds : null,
    foodIds: foodIds.length ? foodIds : null,
    cafeIds: cafeIds.length ? cafeIds : null,
    dislikeIds: dislikeIds.length ? dislikeIds : null,
    activityTagId,
    activityValue:
      activityIdx >= 0 ? (ACTIVITY_VALUE_BY_IDX[activityIdx] ?? 50) : 50,
  };
};

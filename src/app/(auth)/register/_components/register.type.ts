export type Tags = {
  themes: string[] | null;
  moods: string[] | null;
  dislikes: string[] | null;
  foods: string[] | null;
  cafes: string[] | null;
  activity: string | null;
  activityValue: number;
};

export type RegisterFormValues = {
  userId: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  email: string;
  tags: Tags;
};

export type RegisterStep = 1 | 2;

export const STEP_META: Record<
  RegisterStep,
  {
    label: string;
    description: string;
    badge: string;
    badgeClass: string;
  }
> = {
  1: {
    label: "기본 정보",
    description: "계정 생성을 위해 필요한 정보를 입력해주세요.",
    badge: "필수",
    badgeClass: "bg-red-100 text-red-600 border border-red-200",
  },
  2: {
    label: "취향 정보",
    description: "선호 태그는 추천을 개선하며 언제든지 수정할 수 있어요.",
    badge: "선택",
    badgeClass:
      "bg-[color:var(--color-emphasis)]/10 text-[color:var(--color-emphasis)] border border-[color:var(--color-emphasis)]/20",
  },
};

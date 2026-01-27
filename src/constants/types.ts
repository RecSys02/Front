export type Locale = "KR" | "EN";
export const LOCALES: Locale[] = ["KR", "EN"];
export const CATEGORY_LABEL: Record<string, string> = {
  TOURSPOT: "관광지",
  CAFE: "카페",
  RESTAURANT: "음식점",
};

export const THEME_TAGS = [
  "관광",
  "쇼핑",
  "음식",
  "자연",
  "체험",
  "야경/감성",
  "엔터테인먼트",
  "핫플",
] as const;
export const MOOD_TAGS = [
  "고급스러운",
  "세련된",
  "아기자기한",
  "로컬/서민적인",
  "조용한",
  "활기찬",
  "자연친화적인",
  "감성적인",
  "젊은/힙한",
  "가족 친화적",
  "핫플",
] as const;

export const AVOID_TAGS = [
  "너무 시끄러운",
  "오래 기다리는",
  "고령자에게 불편한",
] as const;

export const RESTAURANT_TAGS = [
  "한식",
  "중식",
  "일식",
  "양식",
  "세계음식",
] as const;

export const CAFE_TAGS = [
  "디저트",
  "커피가 맛있는",
  "분위기 좋은",
  "뷰가 좋은",
  "프랜차이즈",
] as const;

export const ACTIVITY_TAGS = [
  "거의 걷고 싶지 않음",
  "적당히 걷는",
  "오래 걸어도 상관 없음",
  "오래 걷는것 선호",
];

export const COMPANION_TAGS = [
  "친구",
  "연인",
  "가족",
  "부모님",
  "아이동반",
  "반려동물",
] as const;

export const BUDGET_TAGS = ["저렴", "중간", "중간~높음", "높음"] as const;

export const TAG_COLORS = [
  "bg-emphasis text-white border-transparent",
  "bg-lime-50 text-lime-700 border-lime-200",
];

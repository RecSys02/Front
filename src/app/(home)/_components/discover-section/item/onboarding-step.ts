import Placeholder from "@/assets/banners/placeholder.png";
import Banner1 from "@/assets/banners/banner1.png";

export type OnboardingConfig = {
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

export const ONBOARDING_STEPS: OnboardingConfig[] = [
  {
    title: "회원 가입",
    subTitle: "초기 태그 설정 단계",
    description:
      "회원 가입과 동시에 카테고리 별 태그들을 입력하게 됩니다. 개인화 추천을 위한 태그 수집 과정입니다. 회원 가입 이후에도 언제든지 수정 가능합니다.",
    image: Banner1,
  },
  {
    title: "STEP 2",
    subTitle: "무언가 설명",
    description: "두 번째 단계 설명...",
    image: Banner1,
  },
  {
    title: "STEP 3",
    subTitle: "또 다른 설명",
    description: "세 번째 단계 설명...",
    image: Placeholder,
  },
] as const;

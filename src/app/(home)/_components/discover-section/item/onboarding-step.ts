import Step1 from "@/assets/onboarding/onboarding-step1.png";
import Step2 from "@/assets/onboarding/onboarding-step2.png";
import Step3 from "@/assets/onboarding/onboarding-step3.png";
import Step4 from "@/assets/onboarding/onboarding-step4.png";

export type OnboardingConfig = {
  title: string;
  subTitle: string;
  description: string;
  image: string;
  bgColor?: string;
};

export const ONBOARDING_STEPS: OnboardingConfig[] = [
  {
    title: "회원 가입",
    subTitle: "초기 태그 설정 단계",
    description:
      "회원 가입과 동시에 카테고리 별 태그들을 입력하게 됩니다. 개인화 추천을 위한 태그 수집 과정입니다. 회원 가입 이후에도 언제든지 수정 가능합니다.",
    image: Step1,
  },
  {
    title: "AI 여행 조건 입력",
    subTitle: "날짜·예산·지역을 알려주세요",
    description:
      "AI 탭에서 여행 날짜, 예산, 지역 등 기본 조건을 입력합니다. 이 정보와 1단계에서 설정한 태그를 함께 사용해 더 정확한 추천을 만들어요.",
    image: Step2,
  },
  {
    title: "장소 추천 · 선택",
    subTitle: "마음에 드는 곳만 골라요",
    description:
      "입력한 조건과 취향을 바탕으로 AI가 장소를 추천합니다. 추천 목록에서 원하는 장소만 선택하면, 다음 단계에서 일정에 반영됩니다.",
    image: Step3,
  },
  {
    title: "일정 자동 생성",
    subTitle: "선택한 장소로 플랜 완성",
    description:
      "선택한 장소들을 바탕으로 이동 동선과 시간을 고려해 일정을 자동으로 생성합니다. 생성된 플랜은 저장되며 공유할 수 있어요.",
    image: Step4,
  },
] as const;

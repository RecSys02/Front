import { FormItemConfig } from "@/components/ui/form/form.type";
import { RegisterFormValues } from "./register.type";
import { TagSelector } from "@/components/ui/tag-selector";
import {
  THEME_TAGS,
  MOOD_TAGS,
  CAFE_TAGS,
  FOOD_TAGS,
  DISLIKE_TAGS,
  TAG_COLORS,
  ACTIVITY_TAGS,
} from "@/constants/types";
import Column from "@/components/common/container/column";
import { PreferenceSection } from "./preference-section";
import { Slider } from "@/components/ui/slider";
import { mapSliderToActivityIndex } from "./register.util";

export const generateRegisterStep2Items = (
  values: RegisterFormValues,
  setValues: React.Dispatch<React.SetStateAction<RegisterFormValues>>
): FormItemConfig<RegisterFormValues>[] => [
  {
    key: "tags",
    children: (
      <Column className="gap-4">
        <PreferenceSection
          title="테마"
          helper="선호하는 여행 테마를 알려주세요"
          withDivider={false}
        >
          <TagSelector
            tags={THEME_TAGS}
            value={values.tags.themes}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  themes: next,
                },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>

        <PreferenceSection
          title="분위기"
          helper="여행의 분위기를 알려주세요"
          withDivider
        >
          <TagSelector
            tags={MOOD_TAGS}
            value={values.tags.moods}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  moods: next,
                },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>

        <PreferenceSection
          title="활동 강도"
          helper="여행의 활동 강도를 조절해 주세요"
          withDivider
        >
          <Slider
            max={100}
            step={1}
            value={[values.tags.activityValue]}
            onValueChange={([val]) => {
              const idx = mapSliderToActivityIndex(val);
              const tag = ACTIVITY_TAGS[idx];
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  activityValue: val,
                  activity: tag,
                },
              }));
            }}
          />
        </PreferenceSection>

        <PreferenceSection
          title="음식"
          helper="좋아하는 음식 타입을 골라주세요"
          withDivider
        >
          <TagSelector
            tags={FOOD_TAGS}
            value={values.tags.foods}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  foods: next,
                },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>

        <PreferenceSection
          title="카페"
          helper="선호하는 카페 스타일이 있다면 선택해 주세요"
          withDivider
        >
          <TagSelector
            tags={CAFE_TAGS}
            value={values.tags.cafes}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  cafes: next,
                },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>

        <PreferenceSection
          title="피하고 싶은 곳"
          helper="있다면 선택해 주세요"
          withDivider
        >
          <TagSelector
            tags={DISLIKE_TAGS}
            value={values.tags.dislikes}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: {
                  ...prev.tags,
                  dislikes: next,
                },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>
      </Column>
    ),
  },
];

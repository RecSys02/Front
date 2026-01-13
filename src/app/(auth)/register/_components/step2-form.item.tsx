import { FormItemConfig } from "@/components/ui/form/form.type";
import { RegisterFormValues } from "./register.type";
import { TagSelector } from "@/components/ui/tag-selector";
import Column from "@/components/common/container/column";
import { PreferenceSection } from "../../../../components/ui/preference-section";
import { Slider } from "@/components/ui/slider";
import { mapSliderToActivityIndex, TagSource } from "./register.util";
import { TAG_COLORS } from "@/constants/types";

export const generateRegisterStep2Items = (
  values: RegisterFormValues,
  setValues: React.Dispatch<React.SetStateAction<RegisterFormValues>>,
  tagSource: TagSource
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
            tags={tagSource.THEME}
            value={values.tags.themes ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: { ...prev.tags, themes: next },
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
            tags={tagSource.MOOD}
            value={values.tags.moods ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: { ...prev.tags, moods: next },
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
              const tag = tagSource.ACTIVITY[idx] ?? null;

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
            tags={tagSource.FOOD}
            value={values.tags.foods ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: { ...prev.tags, foods: next },
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
            tags={tagSource.CAFE}
            value={values.tags.cafes ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: { ...prev.tags, cafes: next },
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
            tags={tagSource.DISLIKE}
            value={values.tags.dislikes ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                tags: { ...prev.tags, dislikes: next },
              }))
            }
            selectedColors={TAG_COLORS}
          />
        </PreferenceSection>
      </Column>
    ),
  },
];

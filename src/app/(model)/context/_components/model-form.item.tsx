import { FormItemConfig } from "@/components/ui/form/form.type";
import { TagSelector } from "@/components/ui/tag-selector";
import { TAG_COLORS, COMPANION_TAGS, BUDGET_TAGS } from "@/constants/types";
import { ModelFormValues } from "./model-form.type";
import { PreferenceSection } from "@/components/ui/preference-section";
import AddressSearchField from "./address-search-field";
import NeighborhoodTagInput from "./neighborhood-tag-input";
import RegionSelectField from "./region-select-field";
import Column from "@/components/common/container/column";
import DateField from "@/components/ui/date-field";
import Row from "@/components/common/container/row";
import Body from "@/components/text/body";

export const generateModelFormItems = (
  values: ModelFormValues,
  setValues: React.Dispatch<React.SetStateAction<ModelFormValues>>
): FormItemConfig<ModelFormValues>[] => [
  {
    key: "dateRange",
    children: (
      <PreferenceSection
        title="여행 날짜"
        helper="시작/종료 날짜를 선택해 주세요"
      >
        <Row className="items-center w-full gap-4">
          <DateField
            className="flex-1 min-w-0 w-full"
            placeholder="여행 시작일"
            value={values.dateRange.from}
            disabledBefore={new Date()}
            onChange={(from) =>
              setValues((prev) => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  from,
                  to:
                    prev.dateRange.to && from && prev.dateRange.to < from
                      ? null
                      : prev.dateRange.to,
                },
              }))
            }
          />
          <Body variant="body3" className="shirink-0">
            ~
          </Body>
          <DateField
            className="flex-1 min-w-0 w-full"
            placeholder="여행 종료일"
            value={values.dateRange.to}
            disabledBefore={values.dateRange.from ?? new Date()}
            onChange={(to) =>
              setValues((prev) => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  to,
                },
              }))
            }
          />
        </Row>
      </PreferenceSection>
    ),
  },
  {
    key: "region",
    children: (
      <Column className="gap-8">
        <PreferenceSection
          title="여행 지역"
          helper="시/도와 시/군/구는 필수 선택"
          withDivider
        >
          <RegionSelectField
            value={values.region}
            onChange={(region) => setValues((prev) => ({ ...prev, region }))}
          />
        </PreferenceSection>

        <PreferenceSection
          title="관심 동네"
          helper="선택 사항 · 원하면 입력해 주세요"
          withDivider={false}
        >
          <NeighborhoodTagInput
            value={values.region.neighborhoods ?? []}
            onChange={(next) =>
              setValues((prev) => ({
                ...prev,
                region: { ...prev.region, neighborhoods: next },
              }))
            }
          />
        </PreferenceSection>
      </Column>
    ),
  },
  {
    key: "companion",
    children: (
      <PreferenceSection
        title="동행"
        helper="동행이 있다면 선택해 주세요"
        withDivider
      >
        <TagSelector
          tags={COMPANION_TAGS}
          value={values.companion ?? []}
          onChange={(next) =>
            setValues((prev) => ({
              ...prev,
              companion: next,
            }))
          }
          selectedColors={TAG_COLORS}
        />
      </PreferenceSection>
    ),
  },
  {
    key: "address",
    children: (
      <PreferenceSection
        title="숙소 주소"
        helper="출발지로 사용할 주소가 있다면 선택해 주세요"
        withDivider
      >
        <AddressSearchField
          value={values.address ?? ""}
          onChange={(address) =>
            setValues((prev) => ({
              ...prev,
              address,
            }))
          }
        />
      </PreferenceSection>
    ),
  },
  {
    key: "budget",
    children: (
      <PreferenceSection title="예산" helper="단일 선택" withDivider>
        <TagSelector
          mode="single"
          tags={BUDGET_TAGS}
          value={values.budget || null}
          onChange={(next) =>
            setValues((prev) => ({
              ...prev,
              budget: next ?? "",
            }))
          }
          selectedColors={TAG_COLORS}
        />
      </PreferenceSection>
    ),
  },
];

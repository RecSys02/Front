import { useEffect, useMemo, useRef, useState } from "react";
import BrandLogo from "@/assets/logos/logo.svg?react";
import Column from "@/components/common/container/column";
import { CustomForm } from "@/components/ui/form/custom-form";
import { useUser, useUpdateUserTag } from "@/hooks/user.hook";
import { useTags } from "@/hooks/tag.hook";
import type {
  RegisterFormValues,
  Tags,
} from "@/app/(auth)/register/_components/register.type";
import {
  pickLabels,
  mapTagIdsToTagsBySource,
  TagOption,
} from "@/app/(auth)/register/_components/register.util";
import { generateRegisterStep2Items } from "@/app/(auth)/register/_components/step2-form.item";

import Modal from "@/components/ui/modal";
import Body from "@/components/text/body";
import type { UpdateUserTagDto } from "@/types/user/user.type";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const makeFormValues = (tags: Tags): RegisterFormValues => ({
  email: "",
  password: "",
  passwordConfirm: "",
  userName: "",
  tags,
  policy: true,
});

const UpdateTagModal = ({ open, onOpenChange }: Props) => {
  const userQuery = useUser();
  const tagsQuery = useTags();
  const updateTag = useUpdateUserTag();

  const user = userQuery.data;
  const tagSource = tagsQuery.data;

  const submitRef = useRef<(() => void) | null>(null);

  const initialTags = useMemo(() => {
    return mapTagIdsToTagsBySource(user?.tagIds, tagSource);
  }, [user?.tagIds, tagSource]);

  const [values, setValues] = useState<RegisterFormValues>(() =>
    makeFormValues(initialTags),
  );

  const hydratedRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedRef.current = false;
      return;
    }
    if (!user || !tagSource) return;
    if (hydratedRef.current) return;

    queueMicrotask(() => {
      setValues(makeFormValues(initialTags));
      hydratedRef.current = true;
    });
  }, [open, user, tagSource, initialTags]);

  const isLoading = userQuery.isLoading || tagsQuery.isLoading;

  const items = tagSource
    ? generateRegisterStep2Items(values, setValues, tagSource)
    : [];

  const handleSubmit = () => {
    if (!tagSource) return toast.error("태그 정보를 불러오지 못했습니다.");

    const preferredThemes =
      pickLabels(values.tags.themeIds, tagSource.THEME) ?? null;
    const preferredMoods =
      pickLabels(values.tags.moodIds, tagSource.MOOD) ?? null;
    const preferredRestaurantTypes =
      pickLabels(values.tags.foodIds, tagSource.FOOD) ?? null;
    const preferredCafeTypes =
      pickLabels(values.tags.cafeIds, tagSource.CAFE) ?? null;
    const avoid = pickLabels(values.tags.dislikeIds, tagSource.DISLIKE) ?? null;

    const activityLevel =
      values.tags.activityTagId != null
        ? tagSource.ACTIVITY_LEVEL.find(
            (o: TagOption) => o.id === values.tags.activityTagId,
          )?.label
        : undefined;

    const payload: UpdateUserTagDto = {
      preferredThemes,
      preferredMoods,
      preferredRestaurantTypes,
      preferredCafeTypes,
      avoid,
      activityLevel,
    };

    updateTag.mutate(
      { body: payload },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={<BrandLogo className="h-12 w-auto mx-auto mt-2" />}
      contentClassName="w-[760px] max-w-[95vw]"
      cancelText="취소"
      onCancelClick={() => onOpenChange(false)}
      ctaText={updateTag.isPending ? "저장 중..." : "저장"}
      isLoading={updateTag.isPending}
      onCtaClick={() => submitRef.current?.()}
      content={
        <Column className="gap-6 max-h-[70vh] overflow-y-auto pr-1">
          <Body variant="body1" className="font-semibold text-center">
            취향 태그 수정
          </Body>

          <CustomForm
            values={values}
            setValues={setValues}
            items={isLoading ? [] : items}
            onSubmit={handleSubmit}
            isValid={!isLoading && !updateTag.isPending}
            submitLabel="저장"
            hideActions
            submitRef={submitRef}
          />
        </Column>
      }
    />
  );
};

export default UpdateTagModal;

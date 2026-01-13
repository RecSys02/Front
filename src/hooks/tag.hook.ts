import { tsr } from "@/apis/client/ts-rest/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  THEME_TAGS,
  MOOD_TAGS,
  FOOD_TAGS,
  CAFE_TAGS,
  DISLIKE_TAGS,
  ACTIVITY_TAGS,
} from "@/constants/types";
import {
  TagSource,
  mapTagsToSource,
} from "@/app/(auth)/register/_components/register.util";
import { Tag } from "@/types/tag/tag.type";
import { ApiOk } from "@/types/util.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const MOCK_TAG_SOURCE: TagSource = {
  THEME: THEME_TAGS,
  MOOD: MOOD_TAGS,
  FOOD: FOOD_TAGS,
  CAFE: CAFE_TAGS,
  DISLIKE: DISLIKE_TAGS,
  ACTIVITY: ACTIVITY_TAGS,
};

export const useTags = () => {
  const onError = () => toast.error("태그 정보를 불러오지 못했습니다.");

  const real = tsr.tag.list.useQuery({
    queryKey: ["tags"],
    enabled: !IS_MOCK,
    onError,
    select: (res: ApiOk<Tag[]>): TagSource => {
      return mapTagsToSource(res.body);
    },
  });

  const mock = useQuery<TagSource>({
    queryKey: ["tags"],
    enabled: IS_MOCK,
    queryFn: async () => MOCK_TAG_SOURCE,
  });

  return IS_MOCK ? mock : real;
};

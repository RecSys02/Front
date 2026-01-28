import { tsr } from "@/apis/client/ts-rest/client";
import type { PlaceDto } from "@/types/place/place.type";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { MOCK_PLACE } from "./hook.mock";
import type { ApiOk } from "@/types/util.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const placeReadKey = (placeId: number, category: string, province: string) =>
  ["place", "read", `${placeId}:${category}:${province}`] as const;

export const useReadPlace = (
  placeId: number,
  query: { category: string; province: string },
): UseQueryResult<PlaceDto> => {
  const category = (query.category ?? "").trim();
  const province = (query.province ?? "").trim();

  const enabled =
    Number.isFinite(placeId) &&
    placeId > 0 &&
    category.length > 0 &&
    province.length > 0;

  const key = placeReadKey(placeId, category, province);

  const mockQuery = useQuery<PlaceDto>({
    queryKey: key,
    enabled: IS_MOCK && enabled,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => MOCK_PLACE,
  });

  const realQuery = tsr.place.read.useQuery({
    queryKey: key,
    enabled: !IS_MOCK && enabled,
    queryData: {
      params: { placeId },
      query: { category, province },
    },
    select: (res: ApiOk<PlaceDto>) => res.body,
    staleTime: 1000 * 60 * 5,
  }) as unknown as UseQueryResult<PlaceDto>;

  return IS_MOCK ? mockQuery : realQuery;
};

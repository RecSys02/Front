import { tsr } from "@/apis/client/ts-rest/client";
import { PlaceDto } from "@/types/place/place.type";
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { MOCK_PLACE } from "./hook.mock";
import { useMemo } from "react";
import { ApiOk } from "@/types/util.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const placeReadKey = (placeId: number, category: string, province: string) =>
  ["place", "read", `${placeId}:${category}:${province}`] as const;

export const useReadPlace = (
  placeId: number,
  query: { category: string; province: string },
): UseQueryResult<PlaceDto> => {
  const key = placeReadKey(placeId, query.category, query.province);

  const enabled =
    !IS_MOCK &&
    Number.isFinite(placeId) &&
    placeId > 0 &&
    !!query.category &&
    !!query.province;

  const real = tsr.place.read.useQuery({
    queryKey: key,
    queryData: {
      params: { placeId },
      query: { category: query.category, province: query.province },
    },
    select: (res: ApiOk<PlaceDto>) => res.body,
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  const mock = useQuery<PlaceDto>({
    queryKey: key,
    enabled: IS_MOCK && Number.isFinite(placeId) && placeId > 0,
    queryFn: async () => MOCK_PLACE,
  });

  return IS_MOCK ? mock : (real as unknown as UseQueryResult<PlaceDto>);
};
type PlaceRef = {
  placeId: number;
  category: string;
  province: string;
};
export const usePrefetchPlaces = (places: PlaceRef[]) => {
  const uniq = useMemo(() => {
    const m = new Map<string, PlaceRef>();
    for (const p of places) {
      const k = `${p.placeId}:${p.category}:${p.province}`;
      if (!m.has(k)) m.set(k, p);
    }
    return Array.from(m.values());
  }, [places]);

  useQueries({
    queries: uniq.map(({ placeId, category, province }) => {
      const key = placeReadKey(placeId, category, province);

      const enabled =
        Number.isFinite(placeId) && placeId > 0 && !!category && !!province;

      if (IS_MOCK) {
        return {
          queryKey: key,
          enabled,
          staleTime: 1000 * 60 * 5,
          queryFn: async () =>
            ({
              ...MOCK_PLACE,
              placeId,
              name: `서울숲(${placeId})`,
            }) as PlaceDto,
        };
      }
      return {
        ...tsr.place.read.queryOptions({
          queryKey: key,
          queryData: {
            params: { placeId },
            query: { category, province },
          },
          select: (res: ApiOk<PlaceDto>) => res.body,
          staleTime: 1000 * 60 * 5,
        }),
        enabled,
      };
    }),
  });
};

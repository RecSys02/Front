import { tsr } from "@/apis/client/ts-rest/client";
import { PlaceDto } from "@/types/place/place.type";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { MOCK_PLACE } from "./hook.mock";
import { useEffect } from "react";
import { ApiOk } from "@/types/util.type";

const IS_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const placeReadKey = (placeId: number, category: string, province: string) =>
  ["place", "read", `${placeId}:${category}:${province}`] as const;

export const useReadPlace = (
  placeId: number,
  query: { category: string; province: string },
): UseQueryResult<PlaceDto> => {
  const key = placeReadKey(placeId, query.category, query.province);

  const real = tsr.place.read.useQuery({
    queryKey: key,
    queryData: {
      params: { placeId },
      query,
    },
    enabled:
      !IS_MOCK &&
      typeof placeId === "number" &&
      !!query.category &&
      !!query.province,
    select: (res: ApiOk<PlaceDto>) => res.body,
  });

  const mock = useQuery<PlaceDto>({
    queryKey: key,
    enabled:
      IS_MOCK &&
      typeof placeId === "number" &&
      !!query.category &&
      !!query.province,
    queryFn: async () => MOCK_PLACE,
  });

  return IS_MOCK ? mock : real;
};

export const usePrefetchPlaces = (
  places: { placeId: number; category: string; province: string }[],
) => {
  const qc = useQueryClient();

  useEffect(() => {
    if (places.length === 0) return;

    places.forEach(({ placeId, category, province }) => {
      const key = placeReadKey(placeId, category, province);

      if (qc.getQueryData(key)) return;

      if (IS_MOCK) {
        qc.setQueryData(key, {
          ...MOCK_PLACE,
          placeId,
          name: `서울숲(${placeId})`,
        });
        return;
      }

      const opts = tsr.place.read.queryOptions({
        queryKey: key,
        queryData: {
          params: { placeId },
          query: { category, province },
        },
        staleTime: 1000 * 60 * 5,
        select: (res: ApiOk<PlaceDto>) => res.body,
      });

      qc.prefetchQuery(opts);
    });
  }, [qc, places]);
};

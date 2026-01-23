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

export const useReadPlace = (id: number): UseQueryResult<PlaceDto> => {
  const key = ["place", "read", id] as const;

  const real = tsr.place.read.useQuery({
    queryKey: key,
    params: { placeId: id as number },
    enabled: !IS_MOCK && typeof id === "number",
    select: (res: ApiOk<PlaceDto>) => res.body,
  });

  const mock = useQuery<PlaceDto>({
    queryKey: key,
    enabled: IS_MOCK && typeof id === "number",
    queryFn: async () => MOCK_PLACE,
  });

  return IS_MOCK ? mock : real;
};

export const usePrefetchPlaces = (placeIds: number[]) => {
  const qc = useQueryClient();

  useEffect(() => {
    if (placeIds.length === 0) return;

    placeIds.forEach((id) => {
      const key = ["place", "read", id] as const;

      if (qc.getQueryData(key)) return;

      if (IS_MOCK) {
        qc.setQueryData(key, {
          ...MOCK_PLACE,
          id,
          placeId: id,
          name: `서울숲(${id})`,
        });
        return;
      }

      qc.prefetchQuery({
        queryKey: key,
        queryFn: async (): Promise<PlaceDto> => {
          const res: ApiOk<PlaceDto> = await tsr.place.read.query({
            params: { placeId: id },
          });
          return res.body;
        },
        staleTime: 1000 * 60 * 5,
      });
    });
  }, [qc, placeIds]);
};
